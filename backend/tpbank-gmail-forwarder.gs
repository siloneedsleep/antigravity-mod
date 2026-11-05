/**
 * ============================================================================
 * SILO VIETQR - TPBANK GMAIL TO N8N CLOUD AUTO-FORWARDER (GOOGLE APPS SCRIPT)
 * ============================================================================
 * Tự động quét email thông báo biến động số dư từ TPBank (tpbank@tpb.com.vn)
 * có chứa mã "SILOxxxxxx" và đẩy thẳng về n8n Cloud Webhook:
 * https://siloneedsleep.app.n8n.cloud/webhook/silo-vietqr-webhook
 *
 * HƯỚNG DẪN CÀI ĐẶT (Chỉ mất 1 phút - Hoặc dùng trực tiếp SePay.vn / Casso.vn):
 * 1. Truy cập https://script.google.com -> Dự án mới (New Project)
 * 2. Dán toàn bộ code này vào và nhấn Lưu (Ctrl + S)
 * 3. Chọn hàm `setupTrigger1Min` ở thanh công cụ phía trên -> Nhấn "Chạy (Run)"
 *    và cấp quyền đọc Gmail.
 * ============================================================================
 */

const N8N_WEBHOOK_URL = "https://siloneedsleep.app.n8n.cloud/webhook/silo-vietqr-webhook";

function scanTPBankEmailsAndForward() {
  const props = PropertiesService.getScriptProperties();
  const processedRaw = props.getProperty("PROCESSED_MSG_IDS") || "[]";
  let processedIds = [];
  try { processedIds = JSON.parse(processedRaw); } catch (e) { processedIds = []; }

  // Tìm các email thông báo biến động số dư TPBank trong 1 ngày gần nhất có mã SILO
  const query = '(from:tpb.com.vn OR subject:TPBank) SILO newer_than:1d';
  const threads = GmailApp.search(query, 0, 10);

  for (let i = 0; i < threads.length; i++) {
    const messages = threads[i].getMessages();
    for (let j = 0; j < messages.length; j++) {
      const msg = messages[j];
      const msgId = msg.getId();
      if (processedIds.indexOf(msgId) !== -1) continue;

      const body = msg.getPlainBody() || msg.getBody() || "";
      const codeMatch = body.match(/SILO\d{6}/i);
      if (codeMatch) {
        const orderCode = codeMatch[0].toUpperCase();
        // Trích xuất số tiền cộng (+50,000 VND hoặc +50.000 VND)
        const amtMatch = body.match(/\+\s*([\d.,]+)\s*(VND|VNĐ)/i) || body.match(/Số tiền[:\s]*\+?\s*([\d.,]+)/i);
        let amount = 0;
        if (amtMatch && amtMatch[1]) {
          amount = parseInt(amtMatch[1].replace(/[.,]/g, ""), 10) || 0;
        }

        const payload = {
          gateway: "TPBank-Gmail",
          order_code: orderCode,
          transferAmount: amount,
          content: orderCode + " (Auto-parsed from TPBank Email)",
          referenceCode: "TPB-" + msgId.slice(-8).toUpperCase(),
          transactionDate: Utilities.formatDate(msg.getDate(), "GMT+7", "yyyy-MM-dd HH:mm:ss")
        };

        UrlFetchApp.fetch(N8N_WEBHOOK_URL, {
          method: "post",
          contentType: "application/json",
          payload: JSON.stringify(payload),
          muteHttpExceptions: true
        });

        processedIds.push(msgId);
      }
    }
  }

  if (processedIds.length > 100) {
    processedIds = processedIds.slice(-100);
  }
  props.setProperty("PROCESSED_MSG_IDS", JSON.stringify(processedIds));
}

function setupTrigger1Min() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("scanTPBankEmailsAndForward")
    .timeBased()
    .everyMinutes(1)
    .create();
}
