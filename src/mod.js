/* AG_MOD_START */
(function () {
    if (typeof window === "undefined" || !window.document) return;
    if (window.top && window.self && window.top !== window.self) return;

    // Hot-Update Bootstrapper: If user updated via GitHub in-app updater, boot latest cached bundle
    const BUNDLED_BUILD_ID = "v3.2.0";
    if (!window.__agBootingCachedBundle) {
        try {
            const cachedBundle = localStorage.getItem("ag_mod_cached_bundle");
            const cachedSha = localStorage.getItem("ag_mod_installed_sha");
            const bundledSha = localStorage.getItem("ag_mod_bundled_sha");
            if (cachedBundle && cachedSha && cachedSha !== bundledSha && cachedBundle.length > 5000) {
                window.__agBootingCachedBundle = true;
                (0, eval)(cachedBundle);
                window.__agBootingCachedBundle = false;
                window.__agModLoaded = true;
                return;
            }
        } catch (err) {
            window.__agBootingCachedBundle = false;
            console.warn("[Antigravity Mod] Cached bundle fallback:", err);
        }
    }
    window.__agModLoaded = true;

    if (typeof window.__agModCleanup === "function") {
        try { window.__agModCleanup(); } catch (e) {}
    }

    const wasModTabActive = !!document.querySelector(".ag-mod-tab-active");
    ["ag-mod-modal", "ag-mod-quick-modal", "ag-settings-mod-pane", "ag-furina-companion", "ag-update-backdrop", "ag-update-toast"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    document.querySelectorAll(".ag-settings-nav-wrap").forEach(el => el.remove());

    const cssText = __AG_CSS_JSON__;

    const defaultConfig = {
        bgUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920",
        bgOpacity: "0.16",
        petUrl: "furina-3d",
        accent: "#3b82f6",
        showLangBtn: true,
        followTyping: true,
        autoCheckUpdate: true
    };

    let savedCfg = {};
    try { savedCfg = JSON.parse(localStorage.getItem("ag_mod_config") || "{}"); } catch (e) {}
    if (savedCfg.furinaVer !== 3) {
        savedCfg.petUrl = "furina-3d";
        savedCfg.accent = "#3b82f6";
        savedCfg.followTyping = true;
        savedCfg.furinaVer = 3;
    }
    let config = Object.assign({}, defaultConfig, savedCfg);
    localStorage.setItem("ag_mod_config", JSON.stringify(config));

    let currentLang = localStorage.getItem("ag_mod_lang") || "VI";

    const dictENtoVI = {
        // Top Bar & Sidebar
        "New Conversation": "Cuộc trò chuyện mới",
        "New conversation": "Cuộc trò chuyện mới",
        "+ New Conversation": "+ Cuộc trò chuyện mới",
        "Automations": "Tự động hóa",
        "Customizations": "Tùy chỉnh",
        "Tùy chỉnh Mod": "Tùy chỉnh",
        "Projects": "Dự án",
        "Project": "Dự án",
        "Conversations": "Trò chuyện",
        "Pinned Conversations": "Trò chuyện đã ghim",
        "Recent Conversations": "Trò chuyện gần đây",
        "No conversations yet": "Chưa có cuộc trò chuyện nào",
        "No pinned conversations": "Chưa có trò chuyện đã ghim",
        "No matching conversations": "Không tìm thấy cuộc trò chuyện phù hợp",
        "No archived conversations": "Không có cuộc trò chuyện lưu trữ",
        "No conversations found": "Không tìm thấy cuộc trò chuyện nào",
        "Outside of Project": "Ngoài dự án",
        "Not in Project": "Ngoài dự án",
        "Settings": "Cài đặt",
        "Provide Feedback": "Gửi phản hồi",
        "Open IDE": "Mở IDE",
        "Open Antigravity IDE": "Mở Antigravity IDE",
        "Open in Antigravity IDE": "Mở trong Antigravity IDE",
        "Workspace": "Không gian",
        "Workspaces": "Không gian làm việc",
        "View": "Hiển thị",
        "Window": "Cửa sổ",
        "Display Options": "Tùy chọn hiển thị",
        "Group By": "Nhóm theo",
        "Sort Conversations": "Sắp xếp trò chuyện",
        "Sort Workspaces": "Sắp xếp không gian",
        "Sort Projects": "Sắp xếp dự án",
        "Last Updated": "Cập nhật gần nhất",
        "Last Prompt": "Tin nhắn gần nhất",
        "Filter": "Bộ lọc",
        "Only Unread": "Chỉ chưa đọc",
        "Only Archived": "Chỉ đã lưu trữ",
        "Only Automations": "Chỉ tự động hóa",
        "Only Scheduled": "Chỉ lịch hẹn",
        "View archived in the sidebar": "Hiện mục lưu trữ ở thanh bên",
        "Create New Project": "Tạo dự án mới",
        "Add Workspace": "Thêm không gian làm việc",
        "Search Conversations": "Tìm kiếm trò chuyện",
        "Search conversations": "Tìm kiếm trò chuyện",
        "Search conversations, commands, and code...": "Tìm trò chuyện, lệnh và mã nguồn...",
        "Toggle Sidebar": "Ẩn/Hiện thanh bên",
        "Close Sidebar": "Đóng thanh bên",
        "Go Back": "Quay lại",
        "Go Forward": "Tiến tới",
        "Notifications": "Thông báo",

        // Chat & Composer
        "Ask anything, @ to mention, / for actions": "Hỏi bất cứ điều gì, @ để gắn thẻ, / để dùng lệnh",
        "Message subagent, @ to mention": "Nhắn cho tác nhân phụ, @ để gắn thẻ",
        "Add a message...": "Nhập tin nhắn...",
        "Listening. Ask anything.": "Đang nghe. Hãy nói bất cứ điều gì.",
        "Sends after agent finishes working": "Tự động gửi sau khi AI xử lý xong",
        "Send Now": "Gửi ngay",
        "Friendly Greeting": "Lời chào thân thiện",
        "Turbo": "Tăng tốc (Turbo)",
        "Auto (Preview)": "Tự động (Thử nghiệm)",
        "Auto": "Tự động",
        "High": "Cao",
        "Medium": "Trung bình",
        "Low": "Thấp",
        "just now": "vừa xong",
        "Thinking": "Đang suy nghĩ",
        "Thought Process": "Quá trình suy nghĩ",
        "Working": "Đang xử lý",
        "Working...": "Đang xử lý...",
        "Running command": "Đang chạy lệnh",
        "Exploring": "Đang khám phá",
        "Explored": "Đã khám phá",
        "Reading": "Đang đọc",
        "Read": "Đã đọc",
        "Analyzing": "Đang phân tích",
        "Analyzed": "Đã phân tích",
        "Editing": "Đang chỉnh sửa",
        "Edited": "Đã chỉnh sửa",
        "Creating": "Đang tạo",
        "Created": "Đã tạo",
        "Deleting": "Đang xóa",
        "Deleted": "Đã xóa",
        "Modified": "Đã sửa đổi",
        "Added": "Đã thêm",
        "Done": "Hoàn tất",
        "Done.": "Hoàn tất.",
        "Canceled": "Đã hủy",
        "Interrupted": "Đã ngắt",
        "Completed": "Đã hoàn thành",
        "Review": "Xem xét",
        "Review Changes": "Xem thay đổi",
        "Proceed": "Tiếp tục",
        "Proceed with Plan": "Tiếp tục theo kế hoạch",
        "Proceed with implementation plan": "Tiếp tục theo kế hoạch triển khai",
        "Confirm": "Xác nhận",
        "Cancel": "Hủy",
        "Close": "Đóng",
        "Save": "Lưu",
        "Save & Continue": "Lưu & Tiếp tục",
        "Reset": "Đặt lại",
        "Edit": "Chỉnh sửa",
        "Delete": "Xóa",
        "Remove": "Gỡ bỏ",
        "Rename": "Đổi tên",
        "Copy": "Sao chép",
        "Copy code": "Sao chép code",
        "Copy Message": "Sao chép tin nhắn",
        "Copy as Markdown": "Sao chép dạng Markdown",
        "Copied": "Đã sao chép",
        "Copied to clipboard": "Đã sao chép vào bộ nhớ tạm",
        "Retry": "Thử lại",
        "Try Again": "Thử lại",
        "Skip": "Bỏ qua",
        "Submit": "Gửi",
        "Continue": "Tiếp tục",
        "Stop": "Dừng",
        "Stop execution": "Dừng thực thi",
        "Stop Execution": "Dừng thực thi",
        "Clear": "Xóa trống",
        "Refresh": "Làm mới",
        "Search": "Tìm kiếm",
        "Search...": "Tìm kiếm...",
        "Clear search": "Xóa tìm kiếm",
        "Back": "Quay lại",
        "Forward": "Tiến tới",
        "Reload": "Tải lại",
        "Open": "Mở",
        "Download": "Tải xuống",
        "Export": "Xuất file",
        "Export as PDF": "Xuất ra PDF",
        "Share": "Chia sẻ",
        "Pin": "Ghim",
        "Unpin": "Bỏ ghim",
        "Pin conversation": "Ghim cuộc trò chuyện",
        "Unpin conversation": "Bỏ ghim cuộc trò chuyện",
        "Archive": "Lưu trữ",
        "Unarchive": "Bỏ lưu trữ",
        "Archive conversation": "Lưu trữ cuộc trò chuyện",
        "Archive Conversation": "Lưu trữ cuộc trò chuyện",
        "Restore": "Khôi phục",
        "Restore Conversation": "Khôi phục cuộc trò chuyện",
        "Delete Conversation": "Xóa cuộc trò chuyện",
        "Delete Permanently": "Xóa vĩnh viễn",
        "Rename Conversation": "Đổi tên cuộc trò chuyện",
        "Fork": "Tạo nhánh (Fork)",
        "Fork Conversation": "Tạo nhánh trò chuyện",
        "Split": "Chia đôi",
        "Mark as Read": "Đánh dấu đã đọc",
        "Mark as Unread": "Đánh dấu chưa đọc",
        "Mark Read": "Đánh dấu đã đọc",
        "Mark Unread": "Đánh dấu chưa đọc",
        "Undo": "Hoàn tác",
        "Undo to Here": "Hoàn tác về đây",
        "Undo to this point": "Hoàn tác về bước này",
        "Confirm Undo": "Xác nhận hoàn tác",
        "Load older messages": "Tải tin nhắn cũ hơn",
        "No more older messages": "Không còn tin nhắn cũ hơn",
        "Conversation Log": "Nhật ký trò chuyện",
        "Good response": "Phản hồi tốt",
        "Bad response": "Phản hồi chưa tốt",
        "Thanks for your feedback!": "Cảm ơn phản hồi của bạn!",

        // Side Panel & Tabs
        "Side Panel": "Bảng bên cạnh",
        "Toggle Side Panel": "Đóng/Mở bảng bên cạnh",
        "Artifacts": "Tài liệu (Artifacts)",
        "No artifacts generated": "Chưa có tài liệu nào được tạo",
        "Background Tasks": "Tác vụ chạy ngầm",
        "No background tasks": "Không có tác vụ chạy ngầm",
        "Cancel All Tasks": "Hủy tất cả tác vụ",
        "Cancel Task": "Hủy tác vụ",
        "Subagents": "Tác nhân phụ",
        "No subagents": "Không có tác nhân phụ",
        "Stop All Subagents": "Dừng mọi tác nhân phụ",
        "Terminals": "Terminals",
        "Terminal": "Terminal",
        "No active terminals": "Không có Terminal nào đang chạy",
        "Open Terminal": "Mở Terminal",
        "New Terminal": "Terminal mới",
        "Add Terminal": "Thêm Terminal",
        "Files": "Tệp tin",
        "No file changes": "Không có tệp nào thay đổi",
        "Changes": "Thay đổi",
        "Staged Changes": "Thay đổi đã chọn (Staged)",
        "Branch Changes": "Thay đổi trên nhánh",
        "Files Changed": "Tệp đã thay đổi",
        "Agent Edits": "Chỉnh sửa bởi AI",
        "True changes vs the parent workspace": "Thay đổi thực tế so với không gian gốc",
        "Files modified by the agent in this conversation": "Các tệp được AI chỉnh sửa trong cuộc trò chuyện này",
        "Documents": "Tài liệu",
        "No documents": "Chưa có tài liệu",
        "Uploads": "Tệp tải lên",
        "No uploads": "Chưa có tệp tải lên",

        // Customizations & Marketplace (/customizations)
        "Marketplace": "Kho tiện ích",
        "Installed": "Đã cài đặt",
        "Featured": "Nổi bật",
        "Details": "Chi tiết",
        "Add": "Thêm",
        "Adding...": "Đang thêm...",
        "Install": "Cài đặt",
        "Installing...": "Đang cài đặt...",
        "Uninstalling...": "Đang gỡ cài đặt...",
        "Enabling...": "Đang bật...",
        "Removing...": "Đang xóa...",
        "Loading...": "Đang tải...",
        "Refreshing...": "Đang làm mới...",
        "Downloading...": "Đang tải xuống...",
        "Saving...": "Đang lưu...",
        "Enable": "Bật",
        "Disable": "Tắt",
        "Enabled": "Đã bật",
        "Disabled": "Đã tắt",
        "Ready": "Sẵn sàng",
        "Pending": "Đang chờ",
        "Error": "Lỗi",
        "Plugins": "Tiện ích (Plugins)",
        "Plugin": "Tiện ích",
        "Skills": "Kỹ năng (Skills)",
        "Skill": "Kỹ năng",
        "Rules": "Quy tắc (Rules)",
        "Hooks": "Hooks",
        "MCP Servers": "Máy chủ MCP",
        "MCP servers": "Máy chủ MCP",
        "Installed MCP Servers": "Máy chủ MCP đã cài",
        "Refresh MCP servers": "Làm mới máy chủ MCP",
        "Add MCP": "Thêm MCP",
        "Add MCP Server": "Thêm máy chủ MCP",
        "Add MCP Servers": "Thêm máy chủ MCP",
        "Open MCP Config": "Mở cấu hình MCP",
        "No MCP servers installed": "Chưa cài đặt máy chủ MCP nào",
        "Custom Agents": "Tác nhân tùy chỉnh",
        "Agents": "Tác nhân (Agents)",
        "Bundles": "Gói công cụ",
        "Apps": "Ứng dụng",
        "Overview": "Tổng quan",
        "Readme": "Giới thiệu",
        "Accounts": "Tài khoản",
        "Connections": "Kết nối",
        "Connected": "Đã kết nối",
        "Not connected": "Chưa kết nối",
        "Connect": "Kết nối",
        "Reconnect": "Kết nối lại",
        "Disconnect": "Ngắt kết nối",
        "Authenticate": "Xác thực",
        "Sign in": "Đăng nhập",
        "Sign In": "Đăng nhập",
        "Sign out": "Đăng xuất",
        "Sign Out": "Đăng xuất",
        "Signed in": "Đã đăng nhập",
        "Not signed in": "Chưa đăng nhập",
        "Not Signed In": "Chưa đăng nhập",
        "Sign-in required": "Yêu cầu đăng nhập",
        "Setup required": "Cần thiết lập",
        "Browse the Marketplace": "Khám phá Kho tiện ích",
        "Find skills, agents, and more in the Marketplace.": "Tìm kiếm kỹ năng, tác nhân và tiện ích mở rộng trong Kho tiện ích.",
        "Search customizations...": "Tìm kiếm tiện ích tùy chỉnh...",
        "More Plugins": "Thêm tiện ích khác",
        "Explore other marketplace customizations": "Khám phá các tiện ích mở rộng khác",
        "Curated sets of plugins for common workflows and roles.": "Các bộ tiện ích chọn lọc cho quy trình làm việc phổ biến.",
        "Read, draft, and edit docs.": "Đọc, soạn thảo và chỉnh sửa tài liệu.",
        "Read, write, and format spreadsheets.": "Đọc, ghi và định dạng bảng tính.",
        "Read, edit, and export presentations.": "Đọc, chỉnh sửa và xuất bài thuyết trình.",
        "Search, upload, download, and share files.": "Tìm kiếm, tải lên, tải xuống và chia sẻ tệp.",
        "Check availability, schedule events, and RSVP.": "Kiểm tra lịch trống, đặt lịch hẹn và phản hồi sự kiện.",
        "Build with Google": "Phát triển cùng Google",
        "Core tools and knowledge required to develop for Android.": "Bộ công cụ và kiến thức cốt lõi để phát triển ứng dụng Android.",
        "Curated collection of agent skills for science tasks.": "Bộ sưu tập kỹ năng AI chuyên biệt cho các tác vụ nghiên cứu khoa học.",
        "Using the Google Antigravity Python SDK to build AI agents": "Sử dụng Google Antigravity Python SDK để xây dựng các tác nhân AI.",
        "Design, Creative & Media": "Thiết kế, Sáng tạo & Truyền thông",
        "Design, creative, and media tools.": "Các công cụ thiết kế, sáng tạo nội dung và đa phương tiện.",
        "Productivity & Project Management": "Năng suất & Quản lý dự án",
        "Plan work, track issues, sign documents, and manage your notes and files.": "Lập kế hoạch, theo dõi công việc, ký tài liệu và quản lý ghi chú, hồ sơ.",
        "Cloud Hosting & Deployment": "Lưu trữ đám mây & Triển khai",
        "Deploy and host your apps, sites, and their backends.": "Triển khai và lưu trữ ứng dụng, website cùng hệ thống backend.",
        "Developer Tools": "Công cụ lập trình",
        "APIs, services, and tools to build, test, secure, and run your apps.": "API, dịch vụ và công cụ để xây dựng, kiểm thử, bảo mật và vận hành ứng dụng.",
        "AI-powered code review and review-comment autofix, powered by CodeRabbit.": "Đánh giá mã nguồn và tự động sửa lỗi bằng AI với CodeRabbit.",
        "Business": "Doanh nghiệp & Kinh doanh",

        // Automations & Scheduled Tasks
        "Scheduled Tasks": "Tác vụ định kỳ",
        "Scheduled Task": "Tác vụ định kỳ",
        "Automation": "Tự động hóa",
        "Start Automation": "Chạy tự động hóa",
        "Always on": "Luôn bật",
        "Paused": "Đang tạm dừng",
        "Runs on this computer": "Chạy trên máy tính này",
        "Runs remotely": "Chạy từ xa",
        "Add trigger": "Thêm bộ kích hoạt",
        "Instructions": "Hướng dẫn thực thi",
        "Run Now": "Chạy ngay",
        "View Logs": "Xem nhật ký",
        "Task Logs": "Nhật ký tác vụ",

        // Settings Modal & All Settings Tabs
        "General": "Chung",
        "Appearance": "Giao diện",
        "Models": "Mô hình AI",
        "Models & Usage": "Mô hình & Mức dùng",
        "Shortcuts": "Phím tắt",
        "Keyboard shortcuts": "Phím tắt bàn phím",
        "App": "Ứng dụng",
        "Application": "Ứng dụng",
        "Developer": "Nhà phát triển",
        "Account": "Tài khoản",
        "Permissions": "Quyền hạn",
        "Browser": "Trình duyệt",
        "Voice": "Giọng nói",
        "Voices": "Giọng đọc",
        "Show All": "Hiện tất cả",
        "Show Less": "Thu gọn",
        "See all": "Xem tất cả",
        "See less": "Thu gọn",
        "See more": "Xem thêm",
        "Execution": "Thực thi",
        "Configure agent execution, queued message delivery, and permissions.": "Cấu hình cách tác nhân thực thi, gửi tin nhắn hàng chờ và quyền hạn.",
        "Queued Messages": "Tin nhắn hàng chờ",
        "Send Immediately": "Gửi ngay lập tức",
        "Queue": "Đưa vào hàng chờ",
        "Interrupt the agent and send immediately.": "Ngắt tác vụ đang chạy và gửi tin nhắn ngay lập tức.",
        "Queue until after the current turn.": "Xếp vào hàng chờ cho đến khi lượt phản hồi hiện tại hoàn tất.",
        "Chat Input": "Khung nhập trò chuyện",
        "Enter to Send": "Nhấn Enter để gửi",
        "Send messages with the keyboard's Enter key instead of starting a new line.": "Gửi tin nhắn bằng phím Enter thay vì xuống dòng mới.",
        "New Conversation Button": "Nút cuộc trò chuyện mới",
        "Which workspace the New Conversation button and keyboard shortcut start you in.": "Chọn không gian làm việc mặc định khi bấm tạo cuộc trò chuyện mới.",
        "New Workspace": "Không gian mới",
        "No Project": "Không dùng dự án",
        "Last Workspace": "Không gian gần nhất",
        "Create a new workspace from your first message.": "Tạo không gian làm việc mới từ tin nhắn đầu tiên của bạn.",
        "Start without a workspace, for general questions.": "Bắt đầu không cần không gian làm việc, phù hợp cho câu hỏi chung.",
        "Reuse your last workspace.": "Sử dụng lại không gian làm việc gần nhất của bạn.",
        "Permission Settings": "Cài đặt quyền hạn",
        "Global Permissions": "Quyền hạn toàn cục",
        "Local Permissions": "Quyền hạn cục bộ",
        "Cloud Permissions": "Quyền hạn đám mây",
        "Permission Details": "Chi tiết quyền hạn",
        "Permission Preset": "Chế độ quyền hạn",
        "Security Preset": "Chế độ bảo mật",
        "Always Proceed": "Luôn tự động chạy",
        "Always Ask": "Luôn hỏi trước",
        "Request Review": "Yêu cầu duyệt",
        "Require Review": "Yêu cầu duyệt",
        "Proceed in Sandbox": "Chạy trong Sandbox",
        "Custom": "Tùy chỉnh",
        "Inherit Global": "Kế thừa toàn cục",
        "Manually customize individual settings.": "Tự tùy chỉnh từng quyền hạn riêng biệt.",
        "Artifact Review Policy": "Chính sách duyệt tài liệu (Artifact)",
        "Review Policy": "Chính sách phê duyệt",
        "Whether the agent asks you to review its documents.": "Tác nhân có hỏi ý kiến bạn trước khi thực thi kế hoạch/tài liệu hay không.",
        "Terminal Command Auto Execution": "Tự động chạy lệnh Terminal",
        "Controls whether terminal commands require your approval before running.": "Kiểm soát việc lệnh Terminal có cần bạn phê duyệt trước khi chạy hay không.",
        "Enable Terminal Sandbox": "Bật Sandbox cho Terminal",
        "Enable Sandbox Mode": "Bật chế độ Sandbox",
        "Restricts agent tools to a secure, isolated local sandbox.": "Giới hạn công cụ của tác nhân trong môi trường Sandbox cô lập, an toàn.",
        "Sandbox Allow Network": "Cho phép mạng trong Sandbox",
        "Agent Non-Workspace File Access": "Truy cập tệp ngoài Không gian làm việc",
        "Outside of folders file access policy": "Chính sách truy cập tệp ngoài thư mục dự án",
        "Configures how the agent tries to access files outside of its working folders.": "Cấu hình cách tác nhân truy cập các tệp nằm ngoài thư mục làm việc.",
        "Terminal & Tooling Permissions": "Quyền Terminal & Công cụ",
        "File Permissions": "Quyền truy cập tệp",
        "File Access Rules": "Quy tắc truy cập tệp",
        "Network Permissions": "Quyền truy cập mạng",
        "Network Access Rules": "Quy tắc truy cập mạng",
        "Tool Permissions": "Quyền sử dụng công cụ",
        "Terminal Commands": "Lệnh Terminal",
        "Commands Outside Sandbox": "Lệnh ngoài Sandbox",
        "MCP Tools": "Công cụ MCP",
        "File Reads": "Đọc tệp",
        "File Writes": "Ghi tệp",
        "Read URLs": "Đọc URL",
        "Execute URLs": "Thực thi URL",
        "Allow": "Cho phép",
        "Ask": "Hỏi trước",
        "Deny": "Từ chối",
        "Always Allow": "Luôn cho phép",
        "Allow Once": "Cho phép 1 lần",
        "Enable Browser Tools": "Bật công cụ Trình duyệt",
        "Browser Subagent": "Tác nhân phụ Trình duyệt",
        "Browser Javascript Execution Policy": "Chính sách chạy Javascript trên Trình duyệt",
        "Browser Actuation Permissions": "Quyền tương tác Trình duyệt",
        "Browser Actuation Rules": "Quy tắc tương tác Trình duyệt",
        "Configure the agent's visual theme and display preferences.": "Tùy chỉnh chủ đề giao diện và bố cục hiển thị của ứng dụng.",
        "Select Theme": "Chọn chủ đề",
        "Themes": "Chủ đề",
        "System": "Theo hệ thống",
        "Light": "Sáng",
        "Dark": "Tối",
        "Default": "Mặc định",
        "Default Light": "Sáng mặc định",
        "Default Dark": "Tối mặc định",
        "Chat": "Trò chuyện",
        "Chat Width": "Độ rộng khung chat",
        "Conversation Width": "Độ rộng cuộc trò chuyện",
        "Configure the maximum width of the conversation panel.": "Cấu hình độ rộng tối đa của khung nội dung trò chuyện.",
        "Markdown Artifact Width": "Độ rộng tài liệu Markdown",
        "Configure the default width of markdown artifacts.": "Cấu hình độ rộng mặc định khi xem tài liệu Markdown.",
        "Narrow": "Hẹp",
        "Wide": "Rộng",
        "Fill": "Toàn khung",
        "Terminal Placement": "Vị trí đặt Terminal",
        "Choose where terminal sessions appear.": "Chọn vị trí hiển thị các phiên làm việc của Terminal.",
        "Bottom Panel": "Khung bên dưới",
        "Context and Quota Indicator": "Chỉ báo Ngữ cảnh & Hạn mức",
        "Show how full the context window is next to the send button. Click it for a breakdown and to see your model quota.": "Hiển thị mức độ đầy bộ nhớ ngữ cảnh cạnh nút gửi. Nhấn vào để xem chi tiết hạn mức mô hình.",
        "Open Links In": "Mở liên kết bằng",
        "Choose where links open by default when clicked.": "Chọn nơi mở các đường dẫn liên kết khi bạn nhấn vào.",
        "New Tab": "Thẻ mới",
        "External Browser": "Trình duyệt ngoài",
        "Open in External Browser": "Mở bằng trình duyệt ngoài",
        "Open in Built-in Browser": "Mở bằng trình duyệt tích hợp",
        "Accessibility": "Trợ năng",
        "Screen Reader Mode": "Chế độ trình đọc màn hình",
        "Optimize the interface and terminal output for screen readers.": "Tối ưu hóa giao diện và đầu ra Terminal cho trình đọc màn hình.",
        "Custom Context Menus": "Menu chuột phải tùy chỉnh",
        "Advanced Settings": "Cài đặt nâng cao",
        "Notification Settings": "Cài đặt thông báo",
        "Enable Notifications for Agent": "Bật thông báo cho Tác nhân",
        "Enable Sounds for Agent": "Bật âm thanh thông báo",
        "Sound": "Âm thanh",
        "Volume": "Âm lượng",
        "Chime volume": "Âm lượng chuông báo",
        "Open System Preferences": "Mở cài đặt hệ thống",
        "To modify notification settings, open your operating system's system preferences.": "Để thay đổi quyền thông báo, hãy mở phần cài đặt hệ điều hành của bạn.",
        "Prevent Sleep": "Ngăn máy tính ngủ",
        "Prevent the computer from sleeping while the app is running.": "Giữ máy tính không chuyển sang chế độ ngủ khi ứng dụng đang chạy.",
        "Keep In Menu Bar": "Giữ trên khay hệ thống",
        "Keep the app accessible from the menu bar and running in the background when all windows are closed.": "Giữ ứng dụng chạy ngầm trên thanh tác vụ khi đã đóng hết các cửa sổ.",
        "Updater": "Cập nhật",
        "Automatic Check for Updates": "Tự động kiểm tra cập nhật",
        "Check for Updates": "Kiểm tra cập nhật",
        "Remote Control": "Điều khiển từ xa",
        "Enable Remote Control": "Bật điều khiển từ xa",
        "Work with local agents from another device.": "Làm việc với các tác nhân trên máy này từ một thiết bị khác.",
        "Device Name": "Tên thiết bị",
        "Windows Subsystem for Linux": "Hệ thống con Windows cho Linux (WSL)",
        "Run the app against a Linux environment. Connecting relaunches the app into the selected WSL distro.": "Chạy ứng dụng trên môi trường Linux. Khi kết nối sẽ khởi động lại vào WSL đã chọn.",
        "Local Windows environment": "Môi trường Windows cục bộ",
        "Model Quota": "Hạn mức mô hình",
        "Model Credits": "Tín dụng mô hình",
        "Quota": "Hạn mức",
        "Refresh quota and credits data": "Làm mới dữ liệu hạn mức và tín dụng",
        "No quota information available.": "Không có thông tin hạn mức.",
        "Token Usage": "Mức dùng Token",
        "Default Customizations": "Tùy chỉnh mặc định",
        "Include Jetski Default Customizations": "Bao gồm bộ kỹ năng mặc định của hệ thống",
        "Include default customizations, such as default skills.": "Bao gồm các tùy chỉnh mặc định chẳng hạn như kỹ năng có sẵn.",
        "Manage Hooks": "Quản lý Hooks",
        "Build With Google Plugins": "Tiện ích Phát triển cùng Google",
        "Configure default behaviors, skills, and MCP servers.": "Cấu hình hành vi mặc định, kỹ năng và máy chủ MCP.",
        "Keyboard shortcuts for quick navigation and control.": "Các phím tắt bàn phím để điều hướng và thao tác nhanh.",
        "Reset All to Defaults": "Khôi phục toàn bộ về mặc định",
        "Search shortcuts...": "Tìm kiếm phím tắt...",
        "Edit Shortcut": "Sửa phím tắt",
        "Add Shortcut": "Thêm phím tắt",
        "Remove Shortcut": "Xóa phím tắt",
        "Reset to Default": "Đặt về mặc định",
        "Your Plan: ": "Gói của bạn: ",
        "Email": "Email",
        "Marketing Emails": "Email tiếp thị & thông tin mới",
        "Enable Telemetry": "Bật thu thập dữ liệu chẩn đoán (Telemetry)",
        "Remote Agents Data": "Dữ liệu tác nhân từ xa",
        "Delete All Remote Agents Data": "Xóa toàn bộ dữ liệu tác nhân từ xa",
        "Delete All Data": "Xóa tất cả dữ liệu",
        "Manage": "Quản lý",
        "Select Project": "Chọn dự án",
        "Manage License": "Quản lý giấy phép",
        "Terms of Service": "Điều khoản dịch vụ",
        "By using this app, you agree to its": "Bằng việc sử dụng ứng dụng, bạn đồng ý với",
        "Version": "Phiên bản",
        "App version": "Phiên bản ứng dụng",
        "Copy version details": "Sao chép thông tin phiên bản",
        "Copied version details": "Đã sao chép thông tin phiên bản",

        // Complete Settings & Popovers Coverage
        "Give Feedback": "Gửi phản hồi",
        "Feedback Type": "Loại phản hồi",
        "Bug Report": "Báo lỗi",
        "Feature Request": "Đề xuất tính năng",
        "Auth and Billing": "Đăng nhập & Thanh toán",
        "Remote Control Issue": "Lỗi điều khiển từ xa",
        "General Feedback": "Phản hồi chung",
        "Description": "Mô tả chi tiết",
        "Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:": "Vui lòng mô tả chi tiết vấn đề của bạn. Thông tin càng cụ thể, đội ngũ kỹ thuật càng hỗ trợ nhanh hơn. Một số thông tin hữu ích gồm:",
        "Steps to reproduce the issue": "Các bước tái hiện lỗi",
        "Expected behavior": "Hành vi mong đợi",
        "Actual behavior": "Hành vi thực tế xảy ra",
        "Any error messages": "Thông báo lỗi (nếu có)",
        "Any relevant information": "Các thông tin liên quan khác",
        "Steps to Reproduce": "Các bước tái hiện",
        "Attach a screenshot (optional)": "Đính kèm ảnh chụp màn hình (tùy chọn)",
        "Attach Antigravity server logs": "Đính kèm nhật ký hệ thống Antigravity",
        "Visit": "Truy cập",
        "Legal Help": "Trợ giúp Pháp lý",
        "to ask for content changes for legal reasons.": "để yêu cầu thay đổi nội dung vì lý do pháp lý.",
        "Enter device name...": "Nhập tên thiết bị...",
        "Describe the bug you encountered...": "Mô tả lỗi bạn gặp phải...",
        "Please list the steps to reproduce the issue": "Liệt kê các bước để tái hiện lỗi...",
        "Manage your plan, credentials, and general preferences.": "Quản lý gói dịch vụ, tài khoản và các tùy chọn chung của bạn.",
        "When toggled on, Antigravity collects usage data to help Google enhance performance and features.": "Khi bật, Antigravity sẽ thu thập dữ liệu sử dụng ẩn danh để giúp Google cải thiện hiệu năng và tính năng.",
        "Receive product updates, tips, and promotions from Google Antigravity via email.": "Nhận thông tin cập nhật sản phẩm, mẹo hay và ưu đãi từ Google Antigravity qua email.",
        "Configure global allowed and denied resource permissions.": "Cấu hình quyền truy cập tài nguyên được phép và bị từ chối trên toàn cục.",
        "Learn more.": "Tìm hiểu thêm.",
        "Learn more": "Tìm hiểu thêm",
        "Controls the actions the agent can take.": "Kiểm soát các hành động mà tác nhân được phép thực hiện.",
        "Every command requires approval.": "Mọi câu lệnh đều cần bạn phê duyệt.",
        "Ask before sensitive operations.": "Hỏi ý kiến trước các thao tác nhạy cảm.",
        "Automatically decide if commands run.": "Tự động quyết định có chạy lệnh hay không.",
        "Run all commands without restrictions.": "Chạy mọi câu lệnh không giới hạn.",
        "Modify permissions for file, terminal, and MCP tools.": "Tùy chỉnh quyền hạn cho tệp tin, terminal và công cụ MCP.",
        "Configure allowed and denied URLs for reading.": "Cấu hình danh sách URL được phép hoặc bị chặn đọc dữ liệu.",
        "Agent Behavior": "Hành vi tác nhân",
        "Plan Review Policy": "Chính sách duyệt kế hoạch",
        "Modified in": "Đã chỉnh sửa trong",
        "projects": "dự án",
        "project": "dự án",
        "Type": "Gõ",
        "and select": "và chọn",
        "to have the agent generate a plan.": "để yêu cầu tác nhân lập kế hoạch.",
        "Configure when follow-up messages are sent.": "Cấu hình thời điểm gửi các tin nhắn tiếp theo.",
        "Built-in Browser": "Trình duyệt tích hợp",
        "Configure link opening and built-in browser preferences.": "Cấu hình cách mở liên kết và tùy chọn trình duyệt tích hợp.",
        "Download Location": "Thư mục tải xuống",
        "Folder where files downloaded in the built-in browser are saved.": "Thư mục lưu trữ các tệp tải về từ trình duyệt tích hợp.",
        "Change…": "Thay đổi…",
        "Change...": "Thay đổi...",
        "Browsing History": "Lịch sử duyệt web",
        "Clear visited URLs and autocomplete suggestions from the built-in browser.": "Xóa lịch sử URL đã truy cập và gợi ý tự động điền khỏi trình duyệt tích hợp.",
        "Configure the browser subagent. It requires": "Cấu hình tác nhân trình duyệt. Tính năng này yêu cầu cài đặt",
        "to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.": "trên máy. Bạn có thể gọi tác nhân trình duyệt bằng cách gõ /browser vào ô chat.",
        "Controls whether the agent can run custom JavaScript to automate complex browser actions.": "Kiểm soát việc cho phép tác nhân chạy JavaScript tùy chỉnh để tự động hóa các thao tác trình duyệt phức tạp.",
        "Configure allowed and denied URLs for browser actuation.": "Cấu hình danh sách URL được phép hoặc bị chặn khi tác nhân điều khiển trình duyệt.",
        "Voice mode": "Chế độ giọng nói",
        "Microphone": "Micro thu âm",
        "Input device for voice mode and dictation.": "Thiết bị thu âm dùng cho chế độ đàm thoại và nhập liệu giọng nói.",
        "System default": "Mặc định hệ thống",
        "Scan the code to open this device in Remote Control, or": "Quét mã QR để điều khiển thiết bị này từ xa, hoặc",
        "copy link": "sao chép liên kết",
        "Conversation Steps": "Chi tiết bước hội thoại",
        "Choose how much detail is shown during a conversation.": "Chọn mức độ chi tiết được hiển thị trong cuộc trò chuyện.",
        "Verbose": "Chi tiết",
        "Theme": "Chủ đề",
        "Contrast": "Độ tương phản",
        "Strong": "Cao",
        "Font": "Phông chữ",
        "Dark Theme": "Giao diện tối",
        "Light Theme": "Giao diện sáng",
        "Preset": "Mẫu có sẵn",
        "Background": "Màu nền",
        "Foreground": "Màu chữ",
        "Accent": "Màu nhấn",
        "Project 4K": "Giao diện Project 4K",
        "Choose the experience that fits how you work.": "Chọn phong cách trải nghiệm phù hợp với cách làm việc của bạn.",
        "Choose between the Default and Project 4K experience.": "Lựa chọn giữa giao diện Mặc định và giao diện Project 4K.",
        "Developer-only tools. These settings are stored locally in this browser and do not affect other users.": "Công cụ dành riêng cho nhà phát triển. Các cài đặt này chỉ lưu cục bộ và không ảnh hưởng tới người dùng khác.",
        "Navigation": "Điều hướng",
        "Open Conversation Picker": "Mở bộ chọn cuộc trò chuyện",
        "Open File Search": "Mở tìm kiếm tệp tin",
        "Reopen Closed Tab": "Mở lại thẻ vừa đóng",
        "Select Previous Conversation": "Chọn cuộc trò chuyện trước",
        "Select Next Conversation": "Chọn cuộc trò chuyện tiếp theo",
        "Move Conversation Up": "Di chuyển cuộc trò chuyện lên",
        "Move Conversation Down": "Di chuyển cuộc trò chuyện xuống",
        "Previous Side Panel Tab": "Thẻ bảng bên trước đó",
        "Next Side Panel Tab": "Thẻ bảng bên tiếp theo",
        "Open Settings": "Mở Cài đặt",
        "Conversation": "Cuộc trò chuyện",
        "Focus Input": "Đặt con trỏ vào ô nhập chat",
        "Toggle Model Selector": "Bật/tắt bảng chọn mô hình AI",
        "Toggle Voice Recording": "Bật/tắt ghi âm giọng nói",
        "Find in Pane": "Tìm kiếm trong khung hiện tại",
        "Add to Chat/Quote": "Thêm vào khung chat / Trích dẫn",
        "Archive This Conversation": "Lưu trữ cuộc trò chuyện này",
        "Layout Controls": "Điều khiển bố cục",
        "Toggle Maximize Side Panel": "Phóng to / Thu nhỏ bảng bên",
        "Toggle Overview Panel": "Bật/tắt bảng tổng quan",
        "Toggle Terminal": "Bật/tắt cửa sổ Terminal",
        "Zoom In": "Phóng to giao diện",
        "Zoom Out": "Thu nhỏ giao diện",
        "Reset Zoom": "Đặt lại thu phóng mặc định",
        "Manage your notification preferences.": "Quản lý tùy chọn thông báo của bạn.",
        "Show system notifications when your action is needed or the agent finishes.": "Hiển thị thông báo hệ thống khi cần bạn thao tác hoặc khi tác nhân hoàn tất.",
        "Play a sound when your action is needed or the agent finishes.": "Phát âm thanh khi cần bạn thao tác hoặc khi tác nhân hoàn tất.",
        "Set the volume of agent sounds.": "Điều chỉnh âm lượng thông báo của tác nhân.",
        "Manage your model quota and credits.": "Quản lý hạn mức mô hình và tín dụng AI của bạn.",
        "Plan": "Gói dịch vụ",
        "Your Plan:": "Gói của bạn:",
        "You can upgrade to a Google AI Ultra plan to receive higher rate limits.": "Bạn có thể nâng cấp lên gói Google AI Ultra để nhận giới hạn sử dụng cao hơn.",
        "Upgrade": "Nâng cấp",
        "Enable AI Credit Overages": "Bật dùng tín dụng AI khi vượt hạn mức",
        "When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.": "Khi bật, Antigravity sẽ dùng tín dụng AI để xử lý yêu cầu khi bạn hết hạn mức mô hình. Hệ thống luôn ưu tiên dùng hạn mức mô hình trước khi trừ tín dụng AI.",
        "See Activity": "Xem hoạt động",
        "Get More AI Credits": "Nhận thêm tín dụng AI",
        "Gemini Models": "Mô hình Gemini",
        "Claude and GPT models": "Mô hình Claude và GPT",
        "Weekly Limit Remaining": "Hạn mức tuần còn lại",
        "Five Hour Limit Remaining": "Hạn mức 5 giờ còn lại",
        "Select Model": "Chọn mô hình AI",
        "Model": "Mô hình",
        "New": "Mới",
        "Notice": "Lưu ý",
        "View Usage": "Xem mức dùng",
        "Usage": "Mức sử dụng",
        "Weekly limit": "Hạn mức tuần",
        "5h limit": "Hạn mức 5 giờ",
        "% left": "% còn lại",
        "Manage project folders, agent settings, and permissions.": "Quản lý thư mục dự án, cài đặt tác nhân và quyền hạn.",
        "Folders": "Thư mục",
        "No folders added yet.": "Chưa có thư mục nào được thêm.",
        "Add Folder": "Thêm thư mục",
        "This project was created for": "Dự án này được tạo cho",
        "the": "tác vụ",
        "automation.": "tự động hóa.",
        "Also includes": "Bao gồm cả",
        "when working": "khi làm việc",
        "in this project": "trong dự án này",
        "Configure allowed and denied paths for file reads and writes.": "Cấu hình đường dẫn được phép hoặc bị chặn khi đọc/ghi tệp tin.",
        "Configure allowed terminal commands.": "Cấu hình các câu lệnh Terminal được phép chạy.",
        "Configure external tools via Model Context Protocol.": "Cấu hình các công cụ bên ngoài thông qua giao thức MCP.",
        "Loading token usage...": "Đang tải mức dùng token...",
        "Loading workspace customizations...": "Đang tải tùy chỉnh không gian làm việc...",
        "Danger Zone": "Khu vực nguy hiểm",
        "Delete Project": "Xóa dự án",
        "This": "Dự án",
        "is managed by the": "này được quản lý bởi",
        "automation and can only be deleted by deleting that automation.": "và chỉ có thể xóa bằng cách xóa tác vụ tự động hóa đó.",
        "Settings for conversations outside of projects.": "Cài đặt cho các cuộc trò chuyện bên ngoài dự án.",
        "The breakdown below shows token usage from customizations like rules, skills, and MCP. If a budget is exceeded, large rules are demoted to path pointers and large customizations are excluded automatically.": "Bảng dưới đây hiển thị mức dùng token từ Quy tắc, Kỹ năng và MCP. Nếu vượt ngân sách, các quy tắc lớn sẽ được rút gọn thành đường dẫn và các tùy chỉnh quá lớn sẽ tự động được lược bỏ.",
        "Mcp Tools": "Công cụ MCP",
        "Global": "Toàn cục",
        "Plugin:": "Tiện ích:",
        "Browse and enable plugins from the Build With Google catalog.": "Duyệt và bật các tiện ích từ danh mục Phát triển cùng Google.",
        "Customize": "Tùy chỉnh",

        // Customizations, Marketplace Shelves, Plugin Details & Installed Tab
        "What can we get done today?": "Hôm nay chúng ta sẽ làm gì nào?",
        "No Model Selected": "Chưa chọn mô hình",
        "Create a plugin that ...": "Tạo một tiện ích giúp ...",
        "Create": "Tạo mới",
        "Skills & Rules": "Kỹ năng & Quy tắc",
        "Built In": "Tích hợp sẵn",
        "No custom agents yet.": "Chưa có tác nhân tùy chỉnh nào.",
        "Error:": "Lỗi:",
        "Fix with Agent": "Sửa lỗi bằng AI",
        "Loading available plugins...": "Đang tải danh sách tiện ích...",
        "Loading plugin...": "Đang tải tiện ích...",
        "What's included": "Nội dung bao gồm",
        "File": "Tệp",
        "Purpose": "Mục đích",
        "Antigravity manifest": "Tệp kê khai Antigravity",
        "Plugin icon": "Biểu tượng tiện ích",
        "Commands": "Các lệnh",
        "Links": "Liên kết",
        "Website": "Trang web",
        "Repository": "Kho mã nguồn",
        "Services this plugin connects to on your behalf. Credentials stay on this machine and are only sent to the domains listed.": "Các dịch vụ mà tiện ích này kết nối thay bạn. Thông tin xác thực được lưu trên máy này và chỉ gửi tới các tên miền được liệt kê.",
        "If you add multiple accounts, MCP servers use the one marked Default.": "Nếu bạn thêm nhiều tài khoản, máy chủ MCP sẽ sử dụng tài khoản được đánh dấu Mặc định.",
        "Used for:": "Dùng cho:",
        "Domains:": "Tên miền:",
        "Scopes:": "Phạm vi quyền:",
        "Paste the code shown after you sign in.": "Dán mã xác thực hiển thị sau khi bạn đăng nhập.",
        "Restart sign-in": "Đăng nhập lại từ đầu",
        "Connect to Google Workspace, including Docs, Sheets, Slides, Drive, and Calendar.": "Kết nối với Google Workspace bao gồm Docs, Sheets, Slides, Drive và Calendar.",
        "Build on Google's developer platforms, including Android, Chrome, Gemini, and Google Cloud.": "Xây dựng trên các nền tảng phát triển của Google gồm Android, Chrome, Gemini và Google Cloud.",
        "Payments, CRM, accounting, data, identity, customer support, marketing, and workflow automation.": "Thanh toán, CRM, kế toán, dữ liệu, định danh, chăm sóc khách hàng, tiếp thị và tự động hóa quy trình.",
        "Google does not control the availability or functionality of third party developer tools. Your data from third party developer tools connected to your Antigravity instance may be shared with Google. Google will protect any such data in accordance with the Google Privacy Policy, found here:": "Google không kiểm soát tính khả dụng hoặc chức năng của các công cụ bên thứ ba. Dữ liệu từ các công cụ bên thứ ba kết nối với Antigravity có thể được chia sẻ với Google và được bảo vệ theo Chính sách Quyền riêng tư của Google tại:",

        // Marketplace Plugin Descriptions (Full Catalog)
        "Prototype, build & run modern apps that users love with Firebase's backend, AI, and operational infrastructure.": "Tạo nguyên mẫu, xây dựng và vận hành ứng dụng hiện đại với hạ tầng backend, AI và đám mây của Firebase.",
        "Connect Antigravity to your Notion workspace with the Notion MCP server, plus skills for research, documentation, meeting prep, specs, trackers, and project updates.": "Kết nối Antigravity với không gian làm việc Notion qua máy chủ Notion MCP cùng bộ kỹ năng nghiên cứu, viết tài liệu, chuẩn bị họp và cập nhật dự án.",
        "Up-to-date documentation lookup. Pull version-specific documentation and code examples directly from source repositories into your LLM context.": "Tra cứu tài liệu luôn cập nhật. Trích xuất tài liệu và ví dụ code chuẩn theo từng phiên bản trực tiếp từ mã nguồn vào ngữ cảnh AI.",
        "The product development system for teams and agents. Manage issues, projects, and documents across your Linear workspace from Antigravity.": "Hệ thống phát triển sản phẩm cho đội ngũ và tác nhân AI. Quản lý tác vụ, dự án và tài liệu trên không gian Linear ngay từ Antigravity.",
        "Investigate production issues with real Dynatrace data: problems and root causes, logs, metrics, traces, and vulnerabilities, via skills and the MCP server.": "Điều tra sự cố vận hành thực tế với dữ liệu Dynatrace: nguyên nhân gốc rễ, nhật ký (logs), chỉ số, truy vết và lỗ hổng bảo mật qua kỹ năng và máy chủ MCP.",
        "Accept payments and grow your business. Stripe's official MCP server enables AI agents to manage customers, products, prices, payment links, invoices, subscriptions, and refunds, as well as search Stripe documentation.": "Chấp nhận thanh toán và phát triển kinh doanh. Máy chủ MCP chính thức của Stripe giúp AI quản lý khách hàng, sản phẩm, bảng giá, liên kết thanh toán, hóa đơn, gói đăng ký, hoàn tiền và tra cứu tài liệu Stripe.",
        "Build applications with the Gemini Interactions API and Live API, including text, image, video, and speech generation, managed agents, and real-time multimodal streaming.": "Xây dựng ứng dụng với Gemini Interactions API và Live API, bao gồm tạo văn bản, hình ảnh, video, giọng nói, tác nhân tự quản lý và truyền phát đa phương thức thời gian thực.",
        "Reliable automation, in-depth debugging, and performance analysis in Chrome using Chrome DevTools and Puppeteer": "Tự động hóa tin cậy, gỡ lỗi chuyên sâu và phân tích hiệu năng trên Chrome bằng Chrome DevTools và Puppeteer.",
        "Search and retrieve official documentation across Google Cloud, Gemini, Android, Firebase, Flutter, and Web. Requires Google Cloud credentials (ADC) or an API key.": "Tìm kiếm và truy xuất tài liệu chính thức trên Google Cloud, Gemini, Android, Firebase, Flutter và Web. Yêu cầu thông tin xác thực Google Cloud (ADC) hoặc API key.",
        "Keep your coding agent up to date with the latest web best practices.": "Giúp tác nhân lập trình luôn cập nhật các chuẩn mực và kỹ thuật phát triển web hiện đại nhất.",
        "Integration skill and tools for Google Maps Platform APIs": "Bộ kỹ năng và công cụ tích hợp cho các API của Google Maps Platform.",
        "Official plugin for Dart and Flutter that installs Flutter/Dart Skills, Rules, Custom Agents, and Dart MCP server for building natively compiled, visually stunning applications for mobile, web, desktop, and embedded devices from a single codebase": "Tiện ích chính thức cho Dart và Flutter giúp cài đặt Kỹ năng, Quy tắc, Tác nhân tùy chỉnh và máy chủ Dart MCP để xây dựng ứng dụng đa nền tảng mượt mà cho di động, web và máy tính từ một mã nguồn duy nhất.",
        "This plugin provides a specialized suite of skills for data engineers and database practitioners working on Google Cloud. It acts as an expert assistant, allowing you to use natural language prompts in your preferred coding agent to architect complex data pipelines, transform data with dbt, write Spark and BigQuery SQL notebooks, and orchestrate end-to-end workflows across GCP's data ecosystem.": "Cung cấp bộ kỹ năng chuyên sâu cho kỹ sư dữ liệu và quản trị cơ sở dữ liệu trên Google Cloud. Đóng vai trò trợ lý chuyên gia giúp thiết kế luồng dữ liệu phức tạp, biến đổi dữ liệu với dbt, viết notebook Spark & BigQuery SQL và điều phối quy trình trên hệ sinh thái dữ liệu GCP.",
        "Google Cloud guidance for coding agents: first-project onboarding, authentication and credential selection, and safety-critical validation for gcloud CLI commands. Includes the Google Developer Knowledge MCP server for grounded, up-to-date Google Cloud documentation.": "Hướng dẫn Google Cloud cho tác nhân lập trình: thiết lập dự án đầu tiên, chọn phương thức xác thực và kiểm tra an toàn cho các lệnh gcloud CLI. Tích hợp máy chủ Google Developer Knowledge MCP để tra cứu tài liệu chuẩn xác.",
        "Create, edit, review, resize, and brand-check Canva designs with the Canva MCP server.": "Tạo, chỉnh sửa, duyệt, đổi kích thước và kiểm tra bộ nhận diện thương hiệu cho thiết kế Canva bằng máy chủ Canva MCP.",
        "Turn Figma designs into production code, map components with Code Connect, and create or edit Figma files in Antigravity.": "Chuyển đổi thiết kế Figma thành mã nguồn hoàn chỉnh, ánh xạ component với Code Connect và tạo hoặc sửa tệp Figma ngay trong Antigravity.",
        "Give your AI agent 600,000+ real app screens, and the skills to use them. Includes the Mobbin MCP and a skill that redesigns your screen from patterns real apps ship, in your own design system, with the references behind every change.": "Cung cấp cho tác nhân AI hơn 600.000 màn hình ứng dụng thực tế cùng kỹ năng thiết kế lại giao diện theo chuẩn các ứng dụng hàng đầu ngay trên hệ thống thiết kế của bạn.",
        "Teamwork Graph CLI is Atlassian's agent-first interface to your entire work context: Jira issues, Confluence pages, Bitbucket PRs, along with your connected third-party data sources. Purpose-built for coding agents like Antigravity (terminal or desktop), and powered by Atlassian's context graph. Try: \"draft a Jira issue from this PR and link it to the epic.\" Run /twg-setup after install to connect Atlassian Teamwork Graph CLI to Antigravity.": "Teamwork Graph CLI là giao diện của Atlassian kết nối toàn bộ ngữ cảnh công việc: tác vụ Jira, trang Confluence, PR Bitbucket và dữ liệu bên thứ ba. Được thiết kế chuyên biệt cho tác nhân lập trình Antigravity. Hãy chạy /twg-setup sau khi cài đặt để kết nối.",
        "Connect Antigravity to Dropbox to search, inspect, summarize, share, collect uploads, organize folders, and clean up files with confirmation for write actions.": "Kết nối Antigravity với Dropbox để tìm kiếm, kiểm tra, tóm tắt, chia sẻ, thu thập tệp tải lên, sắp xếp thư mục và dọn dẹp tệp tin an toàn.",
        "Plan and track work in monday.com from Antigravity: create, update and assign items, write docs, and build forms that turn requests into items.": "Lập kế hoạch và theo dõi công việc trên monday.com từ Antigravity: tạo, cập nhật, giao việc, viết tài liệu và tạo biểu mẫu tự động.",
        "Create and send proposals, quotes, and contracts for e-signature. Track signing progress and identify documents that need follow-up.": "Tạo và gửi đề xuất, báo giá và hợp đồng điện tử. Theo dõi tiến độ ký kết và nhắc nhở các tài liệu cần xử lý.",
        "Official Trello plugin with the Trello MCP server and a skill for boards, lists, cards, checklists, Inbox, and Planner.": "Tiện ích Trello chính thức kèm máy chủ Trello MCP và kỹ năng quản lý bảng, danh sách, thẻ công việc, checklist, Hộp thư và Lịch trình.",
        "Build and deploy on Netlify: functions, edge functions, blobs, database, identity, forms, image CDN, caching, and AI Gateway, plus the Netlify MCP server.": "Xây dựng và triển khai trên Netlify: serverless functions, edge functions, cơ sở dữ liệu, xác thực, biểu mẫu, CDN hình ảnh, bộ nhớ đệm và AI Gateway cùng máy chủ Netlify MCP.",
        "Deploy, configure, monitor, and troubleshoot apps, databases, and infrastructure on Railway from Antigravity with Railway's agent skill and hosted MCP server.": "Triển khai, cấu hình, giám sát và xử lý sự cố ứng dụng, cơ sở dữ liệu và hạ tầng trên Railway từ Antigravity với kỹ năng AI và máy chủ MCP của Railway.",
        "Build and deploy web apps and AI agents on Vercel with skills for Next.js, AI SDK, and cloud services, plus the official Vercel MCP server.": "Xây dựng và triển khai ứng dụng web cùng tác nhân AI trên Vercel với bộ kỹ năng Next.js, AI SDK, dịch vụ đám mây và máy chủ Vercel MCP chính thức.",
        "Build Wix apps and headless sites, and manage Wix stores, bookings, CMS and more, with Wix CLI skills and the official Wix MCP server.": "Xây dựng ứng dụng và website Wix Headless, quản lý cửa hàng, đặt lịch, CMS với bộ kỹ năng Wix CLI và máy chủ Wix MCP chính thức.",
        "Build, publish, and manage WordPress.com and Jetpack-connected sites. Draft posts, edit blocks, check traffic stats, moderate comments, and manage plugins.": "Xây dựng, xuất bản và quản lý các trang WordPress.com và Jetpack. Soạn bài viết, sửa khối giao diện, xem thống kê truy cập, duyệt bình luận và quản lý plugin.",
        "Add Auth0 authentication to any app: login, MFA, SSO, Organizations, RBAC, custom domains, and branding. Debug auth errors and migrate from other providers.": "Tích hợp xác thực Auth0 vào mọi ứng dụng: đăng nhập, MFA, SSO, Tổ chức, phân quyền RBAC, tên miền riêng và gỡ lỗi xác thực.",
        "Build and deploy Base44 full-stack apps: CLI project management, JavaScript/TypeScript SDK development, and production troubleshooting skills.": "Xây dựng và triển khai ứng dụng full-stack Base44: quản lý dự án qua CLI, phát triển với SDK JavaScript/TypeScript và kỹ năng xử lý sự cố.",
        "Give your agent a real browser: navigate, click, type, screenshot, and extract data from any site, locally or on Browserbase cloud browsers.": "Cung cấp trình duyệt thực tế cho tác nhân AI: điều hướng, nhấp chuột, nhập liệu, chụp màn hình và trích xuất dữ liệu từ mọi trang web cục bộ hoặc trên đám mây Browserbase.",
        "Use the official CrowdStrike-hosted MCP server to work across Falcon: detections, cases, threat intel, SIEM, hosts, vulnerabilities, cloud, and more.": "Sử dụng máy chủ MCP chính thức của CrowdStrike để làm việc trên nền tảng Falcon: phát hiện mối đe dọa, hồ sơ vụ việc, tình báo bảo mật, SIEM, máy chủ và lỗ hổng.",
        "Use Datadog directly in Antigravity through a preconfigured Datadog MCP server. Query logs, metrics, traces, dashboards, and more through natural conversation. This plugin is in preview.": "Sử dụng Datadog trực tiếp trong Antigravity qua máy chủ Datadog MCP. Truy vấn nhật ký (logs), chỉ số, truy vết và bảng điều khiển bằng ngôn ngữ tự nhiên (Bản thử nghiệm).",
        "Packaged workflows for SCA remediation, AI SAST triage, CI/CD posture, malware response, findings review, Endor Labs setup, and more.": "Quy trình đóng gói sẵn để khắc phục lỗ hổng thư viện (SCA), phân loại SAST bằng AI, kiểm tra an toàn CI/CD, ứng phó mã độc và thiết lập Endor Labs.",
        "Triage Exabeam New-Scale alerts and cases end to end: gather the evidence, map MITRE, reach a verdict, and record it behind an approval step.": "Phân loại cảnh báo và hồ sơ bảo mật Exabeam New-Scale toàn diện: thu thập bằng chứng, đối chiếu khung MITRE, đưa ra kết luận và lưu trữ có phê duyệt.",
        "Build and debug pipelines, manage deployments, investigate security findings, and operate Harness with connected tools and reusable workflow skills.": "Xây dựng và gỡ lỗi pipeline, quản lý triển khai, điều tra cảnh báo bảo mật và vận hành Harness với các công cụ kết nối cùng kỹ năng tự động hóa.",
        "Search the web and read any page as clean markdown with Keenable, a search engine built for AI agents. Keyless: no signup or API key needed.": "Tìm kiếm trên web và đọc mọi trang dưới dạng Markdown sạch đẹp với Keenable — công cụ tìm kiếm dành cho tác nhân AI, không cần đăng ký hay API key.",
        "Ask a question of the live web and get a table back. Keenable SELECT runs many searches, reads the pages and extracts the fields you need in one call. Sign in with a Keenable account.": "Đặt câu hỏi trên web trực tiếp và nhận về bảng dữ liệu tổng hợp. Keenable SELECT tự động chạy nhiều tìm kiếm, đọc trang và trích xuất các trường bạn cần chỉ trong một lệnh.",
        "Create, run and debug Leapwork Play tests and runlists, build agents, and hand work to Play's AI workflows, right from Antigravity.": "Tạo, chạy và gỡ lỗi các bài kiểm thử Leapwork Play, xây dựng tác nhân và chuyển giao công việc cho quy trình AI của Play ngay từ Antigravity.",
        "Official Antigravity plugin for MongoDB Atlas (hosted MCP Server + Skills). Connect to the MongoDB-hosted Atlas MCP server, explore data, manage collections, optimize queries, generate reliable code, implement best practices, develop advanced features, and more.": "Tiện ích chính thức cho MongoDB Atlas (gồm máy chủ MCP & Kỹ năng). Kết nối tới Atlas MCP để khám phá dữ liệu, quản lý bộ sưu tập, tối ưu hóa truy vấn và sinh mã nguồn chuẩn xác.",
        "Search the live web and fetch page content with Parallel's hosted MCP server. Free access with no Parallel account, API key, or Parallel CLI required.": "Tìm kiếm web trực tiếp và lấy nội dung trang với máy chủ MCP của Parallel. Truy cập miễn phí không cần tài khoản hay API key.",
        "Agent plugin for PingOne multi-tenant. Includes skills and a remote MCP server that lets AI agents configure and monitor your PingOne environments.": "Tiện ích tác nhân cho PingOne đa thuê bao. Bao gồm bộ kỹ năng và máy chủ MCP từ xa giúp AI cấu hình và giám sát môi trường PingOne của bạn.",
        "Equip Antigravity with specialized Postman skills for the complete API lifecycle. Discover, design, test, document, mock, monitor, and improve APIs through agent-friendly, filesystem-first workflows.": "Trang bị cho Antigravity bộ kỹ năng Postman chuyên sâu cho toàn bộ vòng đời API: khám phá, thiết kế, kiểm thử, viết tài liệu, tạo mock, giám sát và tối ưu hóa API.",
        "Set up Qodo, explore code and repository history, review local changes, and resolve pull-request findings directly from Antigravity.": "Thiết lập Qodo, khám phá mã nguồn và lịch sử kho lưu trữ, đánh giá các thay đổi cục bộ và xử lý nhận xét Pull Request ngay từ Antigravity.",
        "Query your SentinelOne Singularity Console from Antigravity through a self-hosted, read-only Purple AI MCP server. Requires an active console deployment, your console URL, and an API token.": "Truy vấn bảng điều khiển SentinelOne Singularity từ Antigravity thông qua máy chủ Purple AI MCP chỉ đọc. Yêu cầu URL bảng điều khiển và API token.",
        "Set up Sentry monitoring, investigate production errors, and configure alerts and releases with expert skills and live context from your Sentry projects.": "Thiết lập giám sát Sentry, điều tra lỗi vận hành thực tế và cấu hình cảnh báo, phiên bản phát hành với ngữ cảnh trực tiếp từ dự án Sentry của bạn.",
        "Official Supabase plugin for Antigravity with Supabase skills and MCP access for project management, database work, auth, storage, and Postgres best practices.": "Tiện ích Supabase chính thức cho Antigravity với bộ kỹ năng và kết nối MCP để quản lý dự án, cơ sở dữ liệu, xác thực, lưu trữ và tối ưu hóa Postgres.",
        "Make your coding agent a better engineer": "Giúp tác nhân lập trình của bạn trở thành một kỹ sư phần mềm xuất sắc hơn.",
        "Unity's official plugin for Antigravity, with curated skills for game development, monetization, and performance optimization.": "Tiện ích chính thức của Unity cho Antigravity với các kỹ năng chọn lọc để phát triển game, kiếm tiền và tối ưu hóa hiệu năng.",
        "Investigate files, URLs, domains and IP addresses with VirusTotal threat intelligence, analysis and submission recovery.": "Điều tra tệp tin, URL, tên miền và địa chỉ IP với hệ thống phân tích và tình báo mối đe dọa của VirusTotal.",
        "Manage your Bigin CRM from Antigravity: review pipelines, find contacts and deals, log calls, plan follow-ups, and email customers.": "Quản lý Bigin CRM từ Antigravity: xem quy trình bán hàng, tìm liên hệ và giao dịch, ghi nhật ký cuộc gọi, lên lịch chăm sóc và gửi email cho khách hàng.",
        "Databricks skills for the CLI, Apps, Lakebase, Model Serving, Lakeflow Jobs, Spark Declarative Pipelines, Declarative Automation Bundles (DABs), and classic-to-serverless migration.": "Bộ kỹ năng Databricks cho CLI, Ứng dụng, Lakebase, Phục vụ mô hình, Lakeflow Jobs, Spark Pipelines, gói tự động hóa DABs và chuyển đổi sang Serverless.",
        "Search Intercom conversations, contacts, and companies, spot support trends, and install the Intercom Messenger with secure identity verification.": "Tìm kiếm hội thoại, liên hệ và công ty trên Intercom, nắm bắt xu hướng hỗ trợ và cài đặt Intercom Messenger với xác thực danh tính an toàn.",
        "SEO workflows on live Semrush data: keyword research, site audits, backlinks, competitor, traffic and market analytics, PPC, and AI brand visibility.": "Quy trình SEO trên dữ liệu Semrush trực tiếp: nghiên cứu từ khóa, kiểm tra website, backlink, phân tích đối thủ, lưu lượng truy cập, quảng cáo PPC và độ phủ thương hiệu.",
        "Search and read your Wispr Flow meeting notes, transcripts, scratchpad notes, and calendar events. Read-only access to your own account.": "Tìm kiếm và đọc ghi chú cuộc họp, bản ghi âm, ghi chú nhanh và sự kiện lịch trên Wispr Flow với quyền truy cập chỉ đọc an toàn.",
        "Connect 9,000+ apps to your AI workflow. Discover, enable, and execute Zapier actions and workflows directly from your client.": "Kết nối hơn 9.000 ứng dụng vào quy trình AI của bạn. Khám phá, kích hoạt và thực thi các hành động tự động hóa Zapier trực tiếp.",
        "Run Zoho Books from Antigravity: invoicing, bills, banking, journals, projects, items, taxes, customization and automation.": "Vận hành Zoho Books từ Antigravity: quản lý hóa đơn, thanh toán, ngân hàng, sổ nhật ký, dự án, mặt hàng, thuế và tự động hóa kế toán.",
        "Build on Zoho CRM v8: REST API, Deluge functions, ClientScript, widgets, COQL and connections, with live CRM data through your Zoho MCP server.": "Phát triển trên Zoho CRM v8: REST API, hàm Deluge, ClientScript, tiện ích, truy vấn COQL và kết nối dữ liệu CRM trực tiếp qua máy chủ Zoho MCP.",
        "Zoho Desk plugin for Antigravity. Review, prioritize, and update Zoho Desk tickets directly from Antigravity through Zoho Desk MCP and includes a Ticket Prioritization Agent for triage and priority updates.": "Tiện ích Zoho Desk cho Antigravity. Xem xét, sắp xếp ưu tiên và cập nhật phiếu hỗ trợ Zoho Desk trực tiếp qua Zoho Desk MCP cùng tác nhân phân loại tự động.",
        "Connect Zoho Projects to Antigravity to turn tasks and issues into working code. Access project context, investigate bugs, and update work items as you develop.": "Kết nối Zoho Projects với Antigravity để chuyển hóa công việc và lỗi thành mã nguồn hoàn chỉnh. Truy cập ngữ cảnh dự án, điều tra lỗi và cập nhật tiến độ khi lập trình.",
        "Connect to your managed Looker MCP server to explore data, run saved Looks, build dashboards, and validate LookML.": "Kết nối tới máy chủ Looker MCP để khám phá dữ liệu, chạy các báo cáo đã lưu, xây dựng bảng điều khiển và kiểm tra mã LookML.",

        // Installed Skills & Subagents Descriptions (Built-in & Plugins)
        "Uses Chrome DevTools MCP for accessibility (a11y) debugging and auditing based on web.dev guidelines. Use when testing semantic HTML, ARIA labels, focus states, keyboard navigation, tap targets, and color contrast.": "Sử dụng Chrome DevTools MCP để kiểm tra và gỡ lỗi khả năng tiếp cận (a11y) theo chuẩn web.dev: kiểm tra HTML ngữ nghĩa, nhãn ARIA, trạng thái lấy nét, điều hướng bàn phím và độ tương phản màu sắc.",
        "Comprehensive guide and reference for the Antigravity Customization System. Use to explain how customizations work, their loading priority, discovery mechanisms, and to guide the creation of skills, rules, plugins, hooks, and MCP servers.": "Hướng dẫn và tài liệu tham khảo toàn diện về Hệ thống Tùy chỉnh Antigravity. Giải thích cơ chế hoạt động, thứ tự ưu tiên nạp và hướng dẫn tạo Kỹ năng, Quy tắc, Tiện ích, Hooks và máy chủ MCP.",
        "Provides instructions for installing and using the `android` CLI. The `android` command-line tool is a critical tool for Android development and helps you create new Android projects, run Android apps on devices, manage and interact with Android virtual devices (including screenshots and UI inspection), manage Android SDK components, look up official Android documentation, and discover and install official Android skills.": "Cung cấp hướng dẫn cài đặt và sử dụng công cụ dòng lệnh `android` CLI để tạo dự án Android mới, chạy ứng dụng trên thiết bị, quản lý máy ảo Android (chụp màn hình, kiểm tra giao diện), quản lý Android SDK và tra cứu tài liệu chính thức.",
        "Instructions for working with the Android Device Hub sidecar, which lists, starts, stops, creates and removes Android Virtual Devices (AVDs), lists physical devices connected to adb, and lets the user mirror and control any of them (video, touch, keyboard, mouse wheel) in the Device Hub pane. Also explains how to inspect and interact with the screen the user is mirroring, with `android layout`, `android screen` and `adb`.": "Hướng dẫn sử dụng bảng điều khiển Android Device Hub để liệt kê, khởi động, dừng, tạo/xóa máy ảo Android (AVD), kết nối thiết bị thật qua adb và phản chiếu, điều khiển trực tiếp màn hình thiết bị.",
        "Provides a comprehensive guide, quick reference, and sitemap for Google Antigravity (AGY), including the Antigravity CLI (agy), Antigravity 2.0, Antigravity IDE, Python SDK, slash commands, keybindings, and customizations (skills, rules, MCP, sidecars). Activate this skill when the user asks questions about how to use, configure, or customize Antigravity, AGY, the agy CLI, the Antigravity IDE, or Antigravity 2.0.": "Cẩm nang toàn diện và tài liệu tra cứu nhanh cho Google Antigravity (AGY), bao gồm agy CLI, Antigravity 2.0, Antigravity IDE, Python SDK, lệnh gạch chéo (/), phím tắt và hệ thống tùy chỉnh.",
        "Interactive guide to design and create a scheduled background automation. Use this skill when the user wants to create an automated or recurring scheduled task (e.g. \"summarize my emails every morning\", \"every Monday send me a to-do list\"). Also triggered by the /automation slash command.": "Hướng dẫn tương tác giúp thiết kế và tạo các tác vụ tự động hóa chạy ngầm theo lịch trình định kỳ (ví dụ: tóm tắt email mỗi sáng, gửi danh sách việc cần làm mỗi thứ Hai). Có thể gọi bằng lệnh /automation.",
        "Uses Chrome DevTools via MCP for efficient debugging, troubleshooting and browser automation. Use when debugging web pages, automating browser interactions, analyzing performance, or inspecting network requests. This skill does not apply to `--slim` mode (MCP configuration).": "Sử dụng Chrome DevTools qua giao thức MCP để gỡ lỗi, xử lý sự cố và tự động hóa trình duyệt hiệu quả: kiểm tra trang web, tự động hóa thao tác, phân tích hiệu năng và theo dõi yêu cầu mạng.",
        "Build and publish Chrome Extensions using Manifest V3 best practices. Use this skill whenever the user asks to create, modify, debug, or understand Chrome browser extensions, add-ons, or anything involving the Chrome Extensions API. Trigger on mentions of: 'Chrome extension', 'browser extension', 'manifest.json', 'content script', 'service worker' (in browser context), 'popup' (in browser extension context), 'side panel', 'chrome.* API', 'declarativeNetRequest', 'omnibox', 'context menu' (in extension context), 'userScripts', 'user script', 'script manager', or any request to build functionality that integrates with the Chrome browser UI. Also trigger for publishing to the Chrome Web Store: 'publish extension', preparing an extension for publishing, responding to a review rejection, writing permission justifications, or drafting a privacy policy.": "Xây dựng và xuất bản tiện ích mở rộng Chrome (Chrome Extensions) theo chuẩn Manifest V3 mới nhất. Hỗ trợ tạo, chỉnh sửa, gỡ lỗi manifest.json, content script, service worker, popup, side panel, API chrome.* và chuẩn bị hồ sơ phát hành lên Chrome Web Store.",
        "Instructions for the Android Compose Preview sidecar, which renders Jetpack Compose @Preview functions with `android preview render` and shows them in the Android Compose Preview pane. Use it when the user wants to see a Compose preview, or to review the result of UI changes - re-render after changing the code so that the pane shows the result.": "Hướng dẫn sử dụng khung xem trước Android Compose Preview để kết xuất các hàm @Preview trong Jetpack Compose bằng lệnh `android preview render` và hiển thị trực tiếp kết quả thay đổi giao diện.",
        "This skill should be used when the user asks about libraries, frameworks, API references, or needs code examples. Activates for setup questions, code generation involving libraries, or mentions of specific frameworks like React, Vue, Next.js, Prisma, Supabase, etc.": "Tự động kích hoạt khi bạn hỏi về thư viện, framework, tài liệu API hoặc cần ví dụ mã nguồn chuẩn xác cho React, Vue, Next.js, Prisma, Supabase và các thư viện phổ biến khác.",
        "Uses Chrome DevTools MCP for inspecting, debugging, and testing cookies, session state, authentication issues, and cookie consent compliance. Use when diagnosing 401/403 errors, authentication redirects, session expiration, Cookie/Set-Cookie header issues, cookie banner consent conformance, or third-party cookie/SameSite/Partitioned cookie warnings.": "Sử dụng Chrome DevTools MCP để kiểm tra và gỡ lỗi cookie, trạng thái phiên đăng nhập, lỗi xác thực 401/403, tiêu đề Cookie/Set-Cookie và cảnh báo SameSite/cookie bên thứ ba.",
        "Guides debugging and optimizing Largest Contentful Paint (LCP) using Chrome DevTools MCP tools. Use this skill whenever the user asks about LCP performance, slow page loads, Core Web Vitals optimization, or wants to understand why their page's main content takes too long to appear. Also use when the user mentions \"largest contentful paint\", \"page load speed\", \"CWV\", or wants to improve how fast their hero image or main content renders.": "Hướng dẫn gỡ lỗi và tối ưu hóa chỉ số Largest Contentful Paint (LCP) cùng Core Web Vitals bằng Chrome DevTools MCP, giúp tăng tốc độ tải trang và hiển thị nội dung chính.",
        "Skill for converting an installed Firebase Extension (or extension source) into a standalone Cloud Functions for Firebase codebase or publishable npm package, including V1 to V2 trigger upgrades, lifecycle hooks, and declarative security": "Kỹ năng chuyển đổi tiện ích mở rộng Firebase (Firebase Extension) thành mã nguồn Cloud Functions độc lập hoặc gói npm, bao gồm nâng cấp trigger V1 lên V2 và cấu hình bảo mật.",
        "Official skill for integrating Firebase AI Logic (Gemini API) into web applications. Covers setup, multimodal inference, structured output, and security.": "Kỹ năng chính thức giúp tích hợp Firebase AI Logic (Gemini API) vào ứng dụng web, bao gồm cài đặt, suy luận đa phương thức, đầu ra có cấu trúc và bảo mật.",
        "Deploys and manages full-stack web applications (Next.js, Angular) with Server-Side Rendering (SSR) using Firebase App Hosting. Use when deploying Next.js/Angular apps, configuring apphosting.yaml or firebase.json apphosting blocks, managing secrets, setting up GitHub CI/CD, or configuring Blaze billing requirements. Don't use for classic static web hosting, Auth, Firestore, Crashlytics, or Xcode.": "Triển khai và quản lý ứng dụng web full-stack (Next.js, Angular) hỗ trợ SSR bằng Firebase App Hosting, cấu hình apphosting.yaml, quản lý khóa bí mật và tích hợp GitHub CI/CD.",
        "Guide for setting up and using Firebase Authentication. Use this skill when the user's app requires user sign-in, user management, or secure data access using auth rules.": "Hướng dẫn thiết lập và sử dụng Firebase Authentication khi ứng dụng cần chức năng đăng nhập, quản lý người dùng và bảo mật truy cập dữ liệu.",
        "Provides foundational Firebase CLI setup, CLI installation, version checks (`firebase-tools@latest --version`), CLI login (including --no-localhost), project creation, project selection (`firebase use`), and app config file downloads (`google-services.json`, `GoogleService-Info.plist`). Use ONLY for CLI login, project creation/switching, or downloading app config files. Don't use for Firebase Hosting deploy, Firestore, Auth, App Hosting, Data Connect, Crashlytics, or Remote Config.": "Hướng dẫn cài đặt và thiết lập nền tảng Firebase CLI: kiểm tra phiên bản, đăng nhập CLI, tạo/chuyển đổi dự án (`firebase use`) và tải tệp cấu hình ứng dụng (`google-services.json`, `GoogleService-Info.plist`).",
        "Comprehensive guide for Firebase Crashlytics, including provisioning and SDK usage. Use this skill when the user needs help setting up Crashlytics, adding crash reporting, or using the Crashlytics SDK in their application.": "Hướng dẫn toàn diện về Firebase Crashlytics, bao gồm khởi tạo dịch vụ, tích hợp SDK và theo dõi báo cáo lỗi sập ứng dụng.",
        "Builds and deploys Firebase SQL Connect (aka Firebase Data Connect) backends with PostgreSQL securely. Use when designing schemas with tables and relations, writing authorized queries and mutations, configuring real-time data updates, or generating type-safe SDKs. Use when you need a relational database with Firebase, or when the user mentions SQL Connect or Data Connect.": "Xây dựng và triển khai backend Firebase Data Connect (SQL Connect) với cơ sở dữ liệu quan hệ PostgreSQL an toàn: thiết kế bảng, viết truy vấn phân quyền và tạo SDK an toàn kiểu dữ liệu.",
        "Sets up, manages, queries, and configures Cloud Firestore databases (Standard/Enterprise edition), including data modeling, security rules, indexes, and SDK integrations (Web, Python, iOS, Android, Flutter). Use when creating/listing Firestore databases, defining data models/indexes, writing SDK queries, or integrating Firestore SDKs. For authoring or modifying Firestore Security Rules (firestore.rules), delegate to the firestore-rules-author subagent if subagent delegation is available, or use firestore-rules-creation otherwise. Don't use for Firebase Hosting, Data Connect, Auth, Storage/GCS, Crashlytics, Functions, or BigQuery.": "Thiết lập, quản lý, truy vấn và cấu hình cơ sở dữ liệu Cloud Firestore, bao gồm mô hình hóa dữ liệu, quy tắc bảo mật, chỉ mục (indexes) và tích hợp SDK cho Web, Python, iOS, Android, Flutter.",
        "Deploys and configures classic Firebase Hosting for static websites, single-page apps (SPAs), and microservices. Use when deploying static sites/SPAs, setting up custom domains, configuring firebase.json hosting settings (redirects, rewrites, headers, multi-site), or managing preview channels. Don't use for Firebase App Hosting (Next.js/SSR), Auth, Firestore queries/rules, Data Connect, or Crashlytics.": "Triển khai và cấu hình Firebase Hosting cho trang web tĩnh, ứng dụng đơn trang (SPA) và microservice: cài đặt tên miền riêng, cấu hình điều hướng, tiêu đề trong firebase.json và kênh xem trước.",
        "Manages Firebase Remote Config templates, feature flags, loading strategies, and SDKs (Android, iOS). Use when downloading/deploying remoteconfig JSON templates, managing version history/feature flags, setting in-app defaults, fetchAndActivate(), real-time listeners, or SDK setup. Don't use for Firebase Hosting, Auth, Firestore, Data Connect, Crashlytics, or App Hosting.": "Quản lý mẫu cấu hình từ xa Firebase Remote Config, cờ tính năng (feature flags), chiến lược tải dữ liệu và tích hợp SDK cho ứng dụng.",
        "Audits Firebase (Firestore, Cloud Storage) security rules for vulnerabilities, privilege escalation, role bypasses, create vs update inconsistencies, resource exhaustion, type safety, size limits, and hasOnly ownership checks. Use when auditing/reviewing rules, running red-team rule assessments, or scoring against auditor checklists. Don't use for Firebase CLI (login, deploy), Auth, Crashlytics, Remote Config, or database queries.": "Kiểm toán quy tắc bảo mật Firebase (Firestore, Cloud Storage) nhằm phát hiện lỗ hổng leo thang đặc quyền, vượt quyền, sai lệch tạo/cập nhật và kiểm tra tính toàn vẹn dữ liệu.",
        "Designs, authors, refactors, and hardens production-grade Cloud Firestore Security Rules (firestore.rules). IMPORTANT: If subagent delegation AND the firestore-rules-author subagent are available in your environment, delegate authoring firestore.rules to the firestore-rules-author subagent. If subagent delegation is unavailable (e.g. not enabled in the IDE), firestore-rules-author is not installed, or you are running inside firestore-rules-author, follow this skill directly.": "Thiết kế, biên soạn, tái cấu trúc và gia cố Quy tắc Bảo mật Cloud Firestore (firestore.rules) đạt chuẩn vận hành thực tế.",
        "Use this skill when writing code that calls the Gemini API for text generation, multi-turn chat, multimodal understanding, image generation, video generation, speech generation (TTS), voice design, voice replication, streaming responses, background research tasks, function calling, structured output, or migrating from the old generateContent API. Covers SDK usage and best practices for Gemini models and agents in Python and TypeScript.": "Sử dụng khi viết mã gọi Gemini API để tạo văn bản, trò chuyện đa lượt, hiểu đa phương thức, tạo ảnh/video/giọng nói (TTS), phản hồi luồng (streaming), gọi hàm và xuất dữ liệu có cấu trúc trong Python và TypeScript.",
        "Use this skill when building real-time, bidirectional streaming applications with the Gemini Live API, or migrating legacy Live models (2.0/2.5/3.1) to Gemini 3.8 Live. Covers WebSocket-based audio/video/text streaming, voice activity detection (VAD), background reasoning (extended thinking), asynchronous function calling, session management, ephemeral tokens, live transcription, and live translation. SDKs covered - google-genai (Python), @google/genai (JavaScript/TypeScript).": "Sử dụng khi xây dựng ứng dụng truyền phát hai chiều thời gian thực với Gemini Live API: truyền tải âm thanh/video/văn bản qua WebSocket, nhận diện giọng nói (VAD), gọi hàm bất đồng bộ và dịch thuật trực tiếp.",
        "Use this skill for generative video editing, text-to-video, image-referenced video generation, first-frame-to-video, first-and-last-frame transitions, and video extensions using Gemini Omni 1.1 Flash (gemini-omni-1.1-flash) via the official google-genai SDK. Includes workflows for pre-processing/optimizing high-resolution or long source videos with ffmpeg, stripping audio for full sound regeneration, and handling turn-by-turn video editing and parallel execution.": "Sử dụng để chỉnh sửa video tạo sinh, tạo video từ văn bản/hình ảnh, chuyển cảnh khung hình đầu-cuối và mở rộng video bằng mô hình Gemini Omni 1.1 Flash qua bộ google-genai SDK.",
        "How to render rich interactive HTML widgets inline in the chat or as standalone artifacts. Use this skill when you want to show the user diagrams, data visualizations, interactive controls, educational walkthroughs, or any rich visual content beyond plain text and markdown.": "Hướng dẫn kết xuất các tiện ích HTML tương tác phong phú ngay trong khung trò chuyện hoặc dưới dạng tài liệu riêng biệt (biểu đồ, trực quan hóa dữ liệu, bảng điều khiển tương tác).",
        "Design, implement, and debug autonomous AI agents and multi-agent systems using the Google Antigravity (AGY) SDK. ACTIVATE this skill when the user wants to create, configure, or orchestrate Google Antigravity agents.": "Thiết kế, triển khai và gỡ lỗi các tác nhân AI tự hành cùng hệ thống đa tác nhân bằng bộ công cụ Google Antigravity (AGY) SDK.",
        "Diagnoses and resolves memory leaks in JavaScript/Node.js applications. Use when a user reports high memory usage, OOM errors, or wants to capture, compare, or inspect heap snapshots with Chrome DevTools MCP memory tools.": "Chẩn đoán và xử lý lỗi rò rỉ bộ nhớ (memory leak) trong ứng dụng JavaScript/Node.js bằng cách chụp, so sánh và phân tích Heap Snapshot qua công cụ bộ nhớ Chrome DevTools MCP.",
        "Automatically migrate legacy workflows to modern skills across global and workspace configurations. Scans for existing workflows, creates target SKILL.md files, and safely archives old workflow files.": "Tự động chuyển đổi các quy trình (workflows) cũ sang chuẩn Kỹ năng (SKILL.md) hiện đại trên toàn hệ thống và lưu trữ an toàn các tệp cũ.",
        "Search tool for modern web development best practices. MANDATORY: Execute FIRST for all HTML/CSS and clientside JS tasks. Do NOT skip - web APIs evolve rapidly and training weights contain obsolete patterns.\nTrigger immediately for: modals/dialogs/popovers, tables, dark mode, anchor positioning, container queries, view transitions, scroll-driven animations, parallax/reveals, forms, validation, autofill, accessibility, custom selects, scrollbars, CWV (LCP, INP, CLS), content-visibility, fetch priority, image optimization, security, passkeys, HTML sanitization, web components, dates/timezones, built-in AI, WebAssembly, standard HTML/CSS/DOM in frameworks, etc.\nDO NOT trigger for: backend (SQL, ORMs, API routes), infra/scripts (CI/CD, Docker, Actions, Python/Go, Git), or tooling/trivial (Vite, tsconfig, ESLint, tests, copy/renames, 3P docs), etc.": "Công cụ tra cứu các chuẩn mực phát triển Web hiện đại nhất cho HTML/CSS và JavaScript phía máy khách (hộp thoại, bảng biểu, giao diện tối, hiệu ứng chuyển cảnh, biểu mẫu, tối ưu hóa Core Web Vitals, bảo mật và Web Components).",
        "Guidelines for interacting with GitHub and request permissions from the user when commands fail due to restrictions in the agent environment.": "Hướng dẫn tương tác với GitHub và yêu cầu cấp quyền từ người dùng khi câu lệnh bị hạn chế trong môi trường sandbox của tác nhân.",
        "How to manage and create plugins - namespaced bundles of skills, agents, rules, MCP servers and hooks that install, enable and disable as a single unit. Use this skill when the user wants to enable, disable, install or uninstall a plugin, when they want to create a new plugin, or when a new customization should be packaged into a plugin rather than left loose. Also triggered by the /plugin slash command. Don't use for the underlying customization system itself - discovery roots, loading priority, or authoring a standalone skill, agent, rule, hook or MCP server outside a plugin; see the customizations guide skill for those.": "Hướng dẫn quản lý và tạo mới Tiện ích (Plugins) - gói tích hợp gồm kỹ năng, tác nhân, quy tắc, máy chủ MCP và hooks có thể cài đặt, bật hoặc tắt đồng bộ. Có thể gọi nhanh bằng lệnh /plugin.",
        "Searches, retrieves, and synthesizes official Google developer documentation across Google Cloud, AI/Gemini, Android, Chrome, Web, Flutter, Go, Firebase, and other Google developer platforms. Integrates with the Developer Knowledge MCP server (search_documents, get_documents, answer_query) or the Developer Knowledge REST API fallback. Use when searching for gcloud CLI commands, API syntax, IAM permissions, official documentation, architectural comparisons, or product choice overviews. Don't use for local filesystem lookups or non-Google documentation.": "Tìm kiếm, truy xuất và tổng hợp tài liệu chính thức dành cho nhà phát triển của Google trên Google Cloud, AI/Gemini, Android, Chrome, Web, Flutter, Go và Firebase thông qua máy chủ Developer Knowledge MCP.",
        "How to write and run a dynamic workflow script with the `run_workflow` tool: a Python script that orchestrates many agents with `agent`, `parallel`, `pipeline`, and `phase`. Use when a task splits into many independent or staged pieces of agent work (fan out over files, modules, bugs, or review angles, then aggregate), or when the user asks for a workflow. Don't use for a single delegated task (use a subagent) or for legacy workflow files (see migrate-workflows).": "Hướng dẫn viết và chạy kịch bản quy trình động bằng công cụ `run_workflow` (kịch bản Python điều phối nhiều tác nhân chạy song song hoặc theo giai đoạn).",
        "Uses Chrome DevTools MCP and documentation to troubleshoot connection and target issues. Trigger this skill when list_pages, new_page, or navigate_page fail, or when the server initialization fails.": "Sử dụng Chrome DevTools MCP và tài liệu kỹ thuật để khắc phục sự cố kết nối trình duyệt khi các lệnh mở trang hoặc điều hướng gặp lỗi.",
        "Discover UI plugin panels relevant to the current task and surface a one-click pill in chat to open (toggle) them in the side pane. Use when a running UI plugin's panel would help with what the user is doing, or right after the user enables a new UI plugin pane and a shortcut to open it is handy.": "Khám phá các bảng điều khiển giao diện tiện ích (UI Plugin) phù hợp với tác vụ hiện tại và hiển thị nút mở nhanh một chạm ngay trong khung trò chuyện.",
        "Safely modifies Xcode projects (.pbxproj) to add Swift Packages and link files. Use this skill whenever an iOS project needs dependencies installed (e.g. Firebase, Alamofire).": "Chỉnh sửa an toàn tệp dự án Xcode (.pbxproj) để thêm các gói thư viện Swift Packages và liên kết tệp cho ứng dụng iOS.",
        "MANDATORY specialist subagent for Cloud Firestore Security Rules (firestore.rules). Whenever your task requires creating, authoring, or modifying Firestore Security Rules (firestore.rules), you MUST delegate rules authoring to this subagent rather than writing firestore.rules directly in the main agent.": "Tác nhân phụ chuyên trách việc thiết kế, viết mới và chỉnh sửa Quy tắc Bảo mật Cloud Firestore (firestore.rules) đảm bảo an toàn tuyệt đối.",
        "Turns scattered notes and recurring work into useful Notion trackers for requests, content plans, or team work. Use to set up or improve a tracker, choosing its fields and views from the user's needs; ordinary record updates belong to the task's workflow.": "Chuyển đổi các ghi chú rời rạc và công việc lặp lại thành bảng theo dõi (Tracker) khoa học trên Notion cho yêu cầu, kế hoạch nội dung hoặc công việc nhóm.",
        "Captures conversations and supplied notes as Notion wiki pages, how-to guides, FAQs, decision records, or retrospectives. Use when saving or updating durable knowledge from existing context; use research-documentation when new source discovery and synthesis is the main task.": "Lưu trữ nội dung cuộc trò chuyện và ghi chú thành trang Wiki, hướng dẫn sử dụng, câu hỏi thường gặp (FAQ) hoặc biên bản quyết định trên Notion.",
        "Prepares meeting agendas, internal pre-reads, and decision briefs using Notion context and relevant research. Use for meeting preparation, recurring meeting context, or updating meeting outcomes; use knowledge-capture for a standalone record of an existing discussion.": "Chuẩn bị chương trình họp, tài liệu đọc trước và bản tóm tắt quyết định bằng ngữ cảnh từ Notion cùng thông tin nghiên cứu liên quan.",
        "Researches questions across Notion sources and synthesizes cited briefs, comparisons, or reports. Use when answering requires discovering and reconciling workspace information, optionally with external research, and returning or saving the findings.": "Nghiên cứu câu hỏi từ các nguồn dữ liệu trong Notion và tổng hợp thành báo cáo, bảng so sánh hoặc bản tóm tắt có trích dẫn nguồn đầy đủ.",
        "A guided setup flow to get the most out of Notion that is recommended for all users who install the Notion MCP.": "Quy trình hướng dẫn thiết lập từng bước giúp khai thác tối đa sức mạnh của Notion sau khi cài đặt Notion MCP.",
        "Converts Notion product or technical specs into implementation plans, linked tasks, and evidence-based progress updates. Use for planning or implementing a spec, creating tasks from requirements, or reconciling implementation with spec changes.": "Chuyển đổi tài liệu đặc tả kỹ thuật hoặc sản phẩm trên Notion thành kế hoạch triển khai, danh sách công việc liên kết và cập nhật tiến độ thực tế.",
        "Produces evidence-based weekly project or team updates by comparing reporting periods, tasks, decisions, and blockers in Notion. Use for recurring status digests; use spec-to-implementation for requirement-level implementation tracking.": "Tạo báo cáo tổng hợp tiến độ dự án hoặc đội nhóm hàng tuần dựa trên dữ liệu công việc, quyết định và các vướng mắc thực tế trong Notion."
    };

    const dictENtoVINorm = {};
    const dictVItoEN = {};
    Object.keys(dictENtoVI).forEach(k => {
        const normKey = k.replace(/[\u2013\u2014\uFFFD]/g, "-").replace(/\s+/g, " ").trim();
        dictENtoVINorm[normKey] = dictENtoVI[k];
        if (k !== "Tùy chỉnh Mod" && !dictVItoEN[dictENtoVI[k]]) {
            dictVItoEN[dictENtoVI[k]] = k;
        }
    });

    function translateTimeSpan(str) {
        return str
            .replace(/(\d+)\s*days?/gi, "$1 ngày")
            .replace(/(\d+)\s*hours?/gi, "$1 giờ")
            .replace(/(\d+)\s*minutes?/gi, "$1 phút")
            .replace(/(\d+)\s*seconds?/gi, "$1 giây")
            .replace(/(\d+)d\b/g, "$1 ngày")
            .replace(/(\d+)h\b/g, "$1 giờ")
            .replace(/(\d+)m\b/g, "$1 phút");
    }

    function translateDynamicString(val, lang) {
        if (lang === "VI") {
            if (dictENtoVI[val]) return dictENtoVI[val];
            const normVal = val.replace(/[\u2013\u2014\uFFFD]/g, "-").replace(/\s+/g, " ").trim();
            if (dictENtoVINorm[normVal]) return dictENtoVINorm[normVal];
            let m;
            if ((m = /^Worked for (.+)$/i.exec(val))) return `Đã xử lý ${m[1]}`;
            if ((m = /^Thought for (.+)$/i.exec(val))) return `Đã suy nghĩ ${m[1]}`;
            if ((m = /^(\d+)\s*s ago$/i.exec(val))) return `${m[1]} giây trước`;
            if ((m = /^(\d+)\s*m ago$/i.exec(val))) return `${m[1]} phút trước`;
            if ((m = /^(\d+)\s*h ago$/i.exec(val))) return `${m[1]} giờ trước`;
            if ((m = /^(\d+)\s*d ago$/i.exec(val))) return `${m[1]} ngày trước`;
            if ((m = /^(\d+)\s*files? changed$/i.exec(val))) return `${m[1]} tệp đã thay đổi`;
            if ((m = /^See (\d+) more$/i.exec(val))) return `Xem thêm ${m[1]} mục`;
            if ((m = /^(\d+) active conversations?$/i.exec(val))) return `${m[1]} cuộc trò chuyện đang mở`;
            if ((m = /^(\d+) archived conversations?$/i.exec(val))) return `${m[1]} cuộc trò chuyện lưu trữ`;
            if ((m = /^Modified in (\d+) projects?$/i.exec(val))) return `Đã chỉnh sửa trong ${m[1]} dự án`;
            if ((m = /^Your Plan:\s*(.+)$/i.exec(val))) return `Gói của bạn: ${m[1]}`;
            if ((m = /^Available AI Credits:\s*(.+)$/i.exec(val))) return `Tín dụng AI khả dụng: ${m[1]}`;
            if ((m = /^(.+) Weekly Limit$/i.exec(val))) return `Hạn mức tuần ${m[1]}`;
            if ((m = /^You have used some of your weekly limit, it will fully refresh in (.+)\.$/i.exec(val))) {
                return `Bạn đã dùng một phần hạn mức tuần, sẽ làm mới hoàn toàn sau ${translateTimeSpan(m[1])}.`;
            }
            if ((m = /^You have used some of your 5-hour limit, it will fully refresh in (.+)\.$/i.exec(val))) {
                return `Bạn đã dùng một phần hạn mức 5 giờ, sẽ làm mới hoàn toàn sau ${translateTimeSpan(m[1])}.`;
            }
            if ((m = /^You have not used any of your weekly limit\.?$/i.exec(val))) {
                return `Bạn chưa sử dụng hạn mức tuần nào.`;
            }
            if ((m = /^You have not used any of your 5-hour limit\.?$/i.exec(val))) {
                return `Bạn chưa sử dụng hạn mức 5 giờ nào.`;
            }
            if ((m = /^Resets in (.+)$/i.exec(val))) return `Làm mới sau ${translateTimeSpan(m[1])}`;
            if ((m = /^Show (\d+) breakdowns?$/i.exec(val))) return `Hiện chi tiết ${m[1]} mục`;
            if ((m = /^Hide (\d+) breakdowns?$/i.exec(val))) return `Ẩn chi tiết ${m[1]} mục`;
            if ((m = /^(\d+) tools? enabled$/i.exec(val))) return `${m[1]} công cụ đang bật`;
            if ((m = /^(\d+) tools?$/i.exec(val))) return `${m[1]} công cụ`;
            if ((m = /^Install (.+)$/.exec(val))) return `Cài đặt ${m[1]}`;
            if ((m = /^More actions for (.+)$/.exec(val))) return `Tùy chọn thêm cho ${m[1]}`;
            if ((m = /^See more in (.+)$/.exec(val))) return `Xem thêm trong ${dictENtoVI[m[1]] || m[1]}`;
            if ((m = /^(.+), Installed$/.exec(val))) return `${m[1]}, Đã cài đặt`;
            if ((m = /^(.+), Disabled$/.exec(val))) return `${m[1]}, Đã tắt`;
            if ((m = /^Send feedback as (.+)$/i.exec(val))) return `Gửi phản hồi dưới tên ${m[1]}`;
            if ((m = /^Settings - (.+)$/.exec(val))) {
                const sub = dictENtoVI[m[1]] || m[1];
                return `Cài đặt - ${sub}`;
            }
            if ((m = /^Manage (.+) app settings\.$/.exec(val))) return `Quản lý cài đặt ứng dụng ${m[1]}.`;
        } else {
            if (val === "Tùy chỉnh Mod") return "Customizations";
            if (dictVItoEN[val]) return dictVItoEN[val];
            let m;
            if ((m = /^Đã xử lý (.+)$/.exec(val))) return `Worked for ${m[1]}`;
            if ((m = /^Đã suy nghĩ (.+)$/.exec(val))) return `Thought for ${m[1]}`;
            if ((m = /^(\d+) giây trước$/.exec(val))) return `${m[1]}s ago`;
            if ((m = /^(\d+) phút trước$/.exec(val))) return `${m[1]}m ago`;
            if ((m = /^(\d+) giờ trước$/.exec(val))) return `${m[1]}h ago`;
            if ((m = /^(\d+) ngày trước$/.exec(val))) return `${m[1]}d ago`;
            if ((m = /^(\d+) tệp đã thay đổi$/.exec(val))) return `${m[1]} ${m[1] === "1" ? "file" : "files"} changed`;
            if ((m = /^Xem thêm (\d+) mục$/.exec(val))) return `See ${m[1]} more`;
            if ((m = /^Xem thêm (\d+)$/.exec(val))) return `See ${m[1]} more`;
            if ((m = /^(\d+) công cụ đang bật$/.exec(val))) return `${m[1]} tools enabled`;
            if ((m = /^(\d+) công cụ$/.exec(val))) return `${m[1]} tools`;
        }
        return null;
    }

    function injectStyles() {
        if (!document.head) return;
        let styleEl = document.getElementById("ag-mod-style");
        if (!styleEl) {
            styleEl = document.createElement("style");
            styleEl.id = "ag-mod-style";
            document.head.appendChild(styleEl);
        }
        styleEl.textContent = cssText;
    }

    // 3D Furina WebGL Engine State
    const furina3DState = {
        initialized: false,
        loading: false,
        renderer: null,
        scene: null,
        camera: null,
        pivot: null,
        eyeMat: null,
        rafId: null,
        targetYaw: 0,
        curYaw: 0,
        targetPitch: 0,
        curPitch: 0,
        targetRoll: 0,
        curRoll: 0,
        bounceY: 0,
        bounceVel: 0,
        wiggleAmp: 0,
        spinOffset: 0,
        spinTarget: 0
    };

    async function initFurina3DEngine() {
        const furinaEl = document.getElementById("ag-furina-companion");
        const canvas = document.getElementById("ag-furina-3d-canvas");
        if (!furinaEl || !canvas) return;
        if (furina3DState.initialized || furina3DState.loading) return;
        furina3DState.loading = true;

        try {
            const THREE = await import("https://esm.sh/three@0.160.0");
            const { FBXLoader } = await import("https://esm.sh/three@0.160.0/examples/jsm/loaders/FBXLoader.js");

            const assetBase = "https://raw.githubusercontent.com/siloneedsleep/antigravity-mod/main/assets/furina-3d/";
            const manager = new THREE.LoadingManager();
            manager.setURLModifier((url) => {
                if (url.startsWith("data:") || url.startsWith("blob:")) return url;
                const base = url.split(/[\\/]/).pop();
                return assetBase + base;
            });

            const loader = new FBXLoader(manager);
            const fbxUrl = assetBase + "furi.fbx";
            const obj = await new Promise((resolve, reject) => {
                loader.load(fbxUrl, resolve, undefined, reject);
            });

            let furiMesh = null;
            obj.traverse(c => {
                if (c.isMesh) {
                    if (c.name === "furi") {
                        furiMesh = c;
                        c.material = (Array.isArray(c.material) ? c.material : [c.material]).map((m, idx) => {
                            if (m.map) {
                                m.map.colorSpace = THREE.SRGBColorSpace;
                                m.map.needsUpdate = true;
                                return new THREE.MeshLambertMaterial({
                                    map: m.map,
                                    color: 0xffffff,
                                    emissive: 0xffffff,
                                    emissiveMap: m.map,
                                    emissiveIntensity: 0.44
                                });
                            }
                            const mat = new THREE.MeshLambertMaterial({
                                color: m.color,
                                emissive: m.color,
                                emissiveIntensity: 0.35
                            });
                            if (idx === 0) {
                                furina3DState.eyeMat = mat;
                            }
                            return mat;
                        });
                    } else {
                        c.visible = false;
                    }
                }
            });

            if (!furiMesh) throw new Error("furi mesh not found");

            const box = new THREE.Box3().setFromObject(furiMesh);
            const center = new THREE.Vector3();
            const size = new THREE.Vector3();
            box.getCenter(center);
            box.getSize(size);

            const scene = new THREE.Scene();
            const pivot = new THREE.Group();
            obj.position.set(-center.x, -center.y, -center.z);
            pivot.add(obj);
            scene.add(pivot);

            const hemi = new THREE.HemisphereLight(0xffffff, 0xdbeafe, 1.68);
            const dir = new THREE.DirectionalLight(0xffffff, 0.85);
            dir.position.set(-800, 2200, -3500);
            scene.add(hemi, dir);

            const camera = new THREE.PerspectiveCamera(26, 1, 10, 50000);
            camera.position.set(0, size.y * 0.02, -size.y * 2.22);
            camera.lookAt(0, -size.y * 0.02, 0);

            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true,
                powerPreference: "low-power"
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(112, 112, false);
            renderer.outputColorSpace = THREE.SRGBColorSpace;

            furina3DState.renderer = renderer;
            furina3DState.scene = scene;
            furina3DState.camera = camera;
            furina3DState.pivot = pivot;
            furina3DState.initialized = true;
            furina3DState.loading = false;

            const is3DMode = !config.petUrl || config.petUrl === "furina-3d";
            if (is3DMode) {
                furinaEl.classList.add("ag-3d-ready");
            }

            let lastTime = performance.now();
            const animate3D = (now) => {
                furina3DState.rafId = requestAnimationFrame(animate3D);
                const dt = Math.min(0.05, (now - lastTime) / 1000);
                lastTime = now;
                const t = now * 0.001;

                // Smooth spring physics for vertical bounce
                furina3DState.bounceY += furina3DState.bounceVel * dt;
                furina3DState.bounceVel -= furina3DState.bounceY * 45 * dt;
                furina3DState.bounceVel *= Math.pow(0.08, dt);
                if (Math.abs(furina3DState.bounceY) < 0.5 && Math.abs(furina3DState.bounceVel) < 2) {
                    furina3DState.bounceY = 0;
                    furina3DState.bounceVel = 0;
                }

                // Decay typing wiggle & interpolate 360 spin
                furina3DState.wiggleAmp *= Math.pow(0.02, dt);
                furina3DState.spinOffset += (furina3DState.spinTarget - furina3DState.spinOffset) * Math.min(1, dt * 9);

                // Smoothly interpolate Yaw / Pitch / Roll towards caret or cursor
                furina3DState.curYaw += (furina3DState.targetYaw - furina3DState.curYaw) * Math.min(1, dt * 14);
                furina3DState.curPitch += (furina3DState.targetPitch - furina3DState.curPitch) * Math.min(1, dt * 14);
                furina3DState.curRoll += (furina3DState.targetRoll - furina3DState.curRoll) * Math.min(1, dt * 14);

                const idleBob = Math.sin(t * 2.5) * 45;
                const idleSway = Math.sin(t * 1.6) * 0.045;
                const typeWiggle = Math.sin(t * 28) * furina3DState.wiggleAmp;

                pivot.position.y = idleBob + furina3DState.bounceY;
                pivot.rotation.y = furina3DState.curYaw + furina3DState.spinOffset + typeWiggle * 0.6;
                pivot.rotation.x = furina3DState.curPitch;
                pivot.rotation.z = furina3DState.curRoll + idleSway + typeWiggle;

                renderer.render(scene, camera);
            };
            furina3DState.rafId = requestAnimationFrame(animate3D);
        } catch (err) {
            furina3DState.loading = false;
            console.warn("[Antigravity Mod] 3D Furina fallback to 2D SVG:", err);
        }
    }

    function applyConfig() {
        const root = document.documentElement;
        if (!root) return;
        root.style.setProperty("--ag-bg-url", config.bgUrl ? `url("${config.bgUrl}")` : "none");
        root.style.setProperty("--ag-bg-opacity", config.bgOpacity);
        root.style.setProperty("--ag-pet-url", "none");
        root.style.setProperty("--ag-accent", config.accent);

        const langBtn = document.getElementById("ag-lang-btn");
        if (langBtn) {
            langBtn.style.display = config.showLangBtn === false ? "none" : "inline-flex";
        }

        const furinaEl = document.getElementById("ag-furina-companion");
        if (furinaEl) {
            if (config.petUrl === "none") {
                furinaEl.classList.add("ag-hidden");
            } else {
                furinaEl.classList.remove("ag-hidden");
                const isFurina3D = !config.petUrl || config.petUrl === "furina-3d";
                const isFurina2D = config.petUrl === "furina-live";
                const svgEl = furinaEl.querySelector("#ag-furina-svg");
                const customImg = furinaEl.querySelector("#ag-furina-custom-img");

                if (isFurina3D) {
                    if (furina3DState.initialized) {
                        furinaEl.classList.add("ag-3d-ready");
                    } else {
                        if (svgEl) svgEl.style.display = "block";
                        initFurina3DEngine();
                    }
                    if (customImg) customImg.style.display = "none";
                } else {
                    furinaEl.classList.remove("ag-3d-ready");
                    if (svgEl) svgEl.style.display = isFurina2D ? "block" : "none";
                    if (customImg) {
                        customImg.style.display = isFurina2D ? "none" : "block";
                        if (!isFurina2D) customImg.src = config.petUrl;
                    }
                }
            }
        }
    }

    // Build Interactive Furina Chibi (3D WebGL + 2D SVG Companion)
    function ensureFurinaCompanion() {
        const card = document.querySelector(".surface-composer-card, .interactive-input-part");
        if (!card) return;
        if (card.querySelector("#ag-furina-companion")) return;

        const wrap = document.createElement("div");
        wrap.id = "ag-furina-companion";
        if (config.petUrl === "none") {
            wrap.classList.add("ag-hidden");
        }
        const isFurina3D = !config.petUrl || config.petUrl === "furina-3d";
        const isFurina2D = config.petUrl === "furina-live";
        const showSvgInitial = isFurina3D || isFurina2D;
        wrap.innerHTML = `
            <div id="ag-furina-bubble">Hãy để Furina xem ngươi viết gì nào~ 💧</div>
            <canvas id="ag-furina-3d-canvas" width="224" height="224"></canvas>
            <img id="ag-furina-custom-img" src="${!showSvgInitial && config.petUrl !== "none" ? config.petUrl : ""}" style="display:${showSvgInitial ? "none" : "block"};width:72px;height:72px;object-fit:contain;margin:18px auto 0 auto;pointer-events:none;transition:transform 0.09s ease-out;" />
            <svg id="ag-furina-svg" style="display:${showSvgInitial ? "block" : "none"}" viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="furina-hair-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="70%" stop-color="#e2e8f0"/>
                        <stop offset="100%" stop-color="#93c5fd"/>
                    </linearGradient>
                    <linearGradient id="furina-Streak" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#60a5fa"/>
                        <stop offset="100%" stop-color="#1d4ed8"/>
                    </linearGradient>
                    <linearGradient id="furina-hat-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#1e3a8a"/>
                        <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                    <linearGradient id="furina-eye-l" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#38bdf8"/>
                        <stop offset="100%" stop-color="#bae6fd"/>
                    </linearGradient>
                    <linearGradient id="furina-eye-r" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#1e3a8a"/>
                        <stop offset="100%" stop-color="#3b82f6"/>
                    </linearGradient>
                </defs>

                <g id="ag-furina-float-wrap">
                    <!-- Back Hair & Twin Locks -->
                    <g id="ag-furina-backhair">
                        <path d="M 28 50 Q 12 68 18 92 Q 25 96 32 84 Q 30 68 35 55 Z" fill="url(#furina-hair-grad)" stroke="#cbd5e1" stroke-width="1"/>
                        <path d="M 22 65 Q 16 78 21 90" stroke="url(#furina-Streak)" stroke-width="3" fill="none" stroke-linecap="round"/>
                        <path d="M 92 50 Q 108 68 102 92 Q 95 96 88 84 Q 90 68 85 55 Z" fill="url(#furina-hair-grad)" stroke="#cbd5e1" stroke-width="1"/>
                        <path d="M 98 65 Q 104 78 99 90" stroke="url(#furina-Streak)" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </g>

                    <!-- Fontaine Outfit / Shoulders -->
                    <g id="ag-furina-body">
                        <path d="M 38 76 Q 60 72 82 76 L 88 94 L 32 94 Z" fill="#172554" stroke="#1e40af" stroke-width="1"/>
                        <!-- White Frilly Collar & Cravat -->
                        <path d="M 46 76 L 60 88 L 74 76 Z" fill="#f8fafc"/>
                        <path d="M 54 78 L 60 92 L 66 78 Z" fill="#2563eb"/>
                        <!-- Hydro Gem Brooch -->
                        <path d="M 60 80 L 63 84 L 60 88 L 57 84 Z" fill="#38bdf8" stroke="#bae6fd" stroke-width="0.8"/>
                    </g>

                    <!-- Interactive Head Group (Tilts & Tracks Text) -->
                    <g id="ag-furina-head">
                        <!-- Back Head Base -->
                        <ellipse cx="60" cy="54" rx="28" ry="25" fill="url(#furina-hair-grad)"/>

                        <!-- Cute Face Contour -->
                        <path d="M 35 48 Q 35 78 60 79 Q 85 78 85 48 Q 85 32 60 32 Q 35 32 35 48 Z" fill="#fff1eb" stroke="#fed7aa" stroke-width="1"/>

                        <!-- Blush Cheeks -->
                        <ellipse cx="42" cy="64" rx="5.2" ry="2.6" fill="#fda4af" opacity="0.65"/>
                        <ellipse cx="78" cy="64" rx="5.2" ry="2.6" fill="#fda4af" opacity="0.65"/>

                        <!-- Open Eyes (Heterochromia!) -->
                        <g class="ag-furina-eye-open">
                            <!-- Left Eye (Bright Cyan with Dark Navy Droplet Pupil) -->
                            <ellipse cx="46" cy="57" rx="7.2" ry="8.2" fill="#ffffff"/>
                            <g class="ag-furina-pupil">
                                <ellipse cx="46" cy="57.5" rx="5.3" ry="6.2" fill="url(#furina-eye-l)"/>
                                <!-- Droplet Pupil -->
                                <path d="M 46 53.5 C 46 53.5 49 57 49 59 C 49 60.8 47.6 62 46 62 C 44.4 62 43 60.8 43 59 C 43 57 46 53.5 46 53.5 Z" fill="#172554"/>
                                <circle cx="43.8" cy="54.8" r="1.9" fill="#ffffff"/>
                                <circle cx="48.2" cy="59.8" r="1.0" fill="#ffffff"/>
                            </g>
                            <path d="M 38 52 Q 46 47 54 53" stroke="#1e293b" stroke-width="2.2" fill="none" stroke-linecap="round"/>

                            <!-- Right Eye (Deep Sapphire with Glowing Cyan Droplet Pupil) -->
                            <ellipse cx="74" cy="57" rx="7.2" ry="8.2" fill="#ffffff"/>
                            <g class="ag-furina-pupil">
                                <ellipse cx="74" cy="57.5" rx="5.3" ry="6.2" fill="url(#furina-eye-r)"/>
                                <!-- Droplet Pupil -->
                                <path d="M 74 53.5 C 74 53.5 77 57 77 59 C 77 60.8 75.6 62 74 62 C 72.4 62 71 60.8 71 59 C 71 57 74 53.5 74 53.5 Z" fill="#7dd3fc"/>
                                <circle cx="71.8" cy="54.8" r="1.9" fill="#ffffff"/>
                                <circle cx="76.2" cy="59.8" r="1.0" fill="#ffffff"/>
                            </g>
                            <path d="M 66 53 Q 74 47 82 52" stroke="#1e293b" stroke-width="2.2" fill="none" stroke-linecap="round"/>
                        </g>

                        <!-- Blink / Happy Closed Eyelids (^ ^) -->
                        <g id="ag-furina-eyelids">
                            <path d="M 39 57 Q 46 51 53 57" stroke="#1e293b" stroke-width="2.3" fill="none" stroke-linecap="round"/>
                            <path d="M 67 57 Q 74 51 81 57" stroke="#1e293b" stroke-width="2.3" fill="none" stroke-linecap="round"/>
                        </g>

                        <!-- Eyebrows -->
                        <path d="M 40 46 Q 46 44 52 46" stroke="#64748b" stroke-width="1.3" fill="none" stroke-linecap="round"/>
                        <path d="M 68 46 Q 74 44 80 46" stroke="#64748b" stroke-width="1.3" fill="none" stroke-linecap="round"/>

                        <!-- Mouth (Smug :3 idle & cute open 'o' when typing) -->
                        <path id="ag-furina-mouth-idle" d="M 55 68 Q 57.5 70.5 60 68.5 Q 62.5 70.5 65 68" stroke="#be123c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                        <ellipse id="ag-furina-mouth-talk" cx="60" cy="69" rx="3.2" ry="3.6" fill="#f43f5e" stroke="#be123c" stroke-width="1"/>

                        <!-- Front Hair Bangs & Blue Inner Streaks -->
                        <path d="M 33 48 Q 37 33 52 33 Q 46 45 36 53 Z" fill="#60a5fa" opacity="0.85"/>
                        <path d="M 87 48 Q 83 33 68 33 Q 74 45 84 53 Z" fill="#2563eb" opacity="0.85"/>
                        <path d="M 32 52 Q 30 30 60 28 Q 90 30 88 52 Q 81 38 72 47 Q 65 36 58 47 Q 48 36 42 47 Q 36 39 32 52 Z" fill="url(#furina-hair-grad)" stroke="#cbd5e1" stroke-width="0.9"/>

                        <!-- Side Hair Framing Locks -->
                        <path d="M 33 46 Q 28 62 34 77 Q 38 66 36 50 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
                        <path d="M 87 46 Q 92 62 86 77 Q 82 66 84 50 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>

                        <!-- Signature Bouncy Ahoge -->
                        <g id="ag-furina-ahoge">
                            <path d="M 61 28 Q 68 12 54 14 Q 62 19 59 28" fill="#ffffff" stroke="#93c5fd" stroke-width="1.2" stroke-linecap="round"/>
                        </g>

                        <!-- Furina's Iconic Fontaine Mini Top Hat -->
                        <g id="ag-furina-hat" transform="translate(38, 6) rotate(-13, 22, 18)">
                            <!-- Hat Brim -->
                            <ellipse cx="22" cy="22" rx="22" ry="5.5" fill="url(#furina-hat-grad)" stroke="#fbbf24" stroke-width="1.2"/>
                            <!-- Hat Crown -->
                            <path d="M 7 21 L 4 6 Q 22 1 40 6 L 37 21 Z" fill="url(#furina-hat-grad)" stroke="#60a5fa" stroke-width="1"/>
                            <!-- White & Gold Ribbon Band -->
                            <path d="M 6.5 17 Q 22 20 37.5 17 L 37 21 Q 22 24 7 21 Z" fill="#f8fafc"/>
                            <path d="M 4 6 Q 22 10 40 6" stroke="#fbbf24" stroke-width="1.5" fill="none"/>
                            <!-- Hydro Teardrop Emblem on Hat -->
                            <path d="M 22 8 C 22 8 26 13 26 15.5 C 26 17.7 24.2 19.5 22 19.5 C 19.8 19.5 18 17.7 18 15.5 C 18 13 22 8 22 8 Z" fill="#38bdf8" stroke="#ffffff" stroke-width="1"/>
                            <!-- Cute Side Bow -->
                            <path d="M 35 16 L 43 12 L 42 20 Z" fill="#2563eb"/>
                            <path d="M 35 16 L 44 19 L 39 24 Z" fill="#60a5fa"/>
                        </g>
                    </g>

                    <!-- Cute Gloved Hands Resting on Chat Box Border -->
                    <g id="ag-furina-hands">
                        <g id="ag-furina-hand-l">
                            <ellipse cx="39" cy="91" rx="6.5" ry="4.8" fill="#ffffff" stroke="#93c5fd" stroke-width="1.2"/>
                            <path d="M 36 89 L 36 93 M 40 89 L 40 93" stroke="#cbd5e1" stroke-width="0.9" stroke-linecap="round"/>
                        </g>
                        <g id="ag-furina-hand-r">
                            <ellipse cx="81" cy="91" rx="6.5" ry="4.8" fill="#ffffff" stroke="#1e40af" stroke-width="1.2"/>
                            <path d="M 79 89 L 79 93 M 83 89 L 83 93" stroke="#cbd5e1" stroke-width="0.9" stroke-linecap="round"/>
                        </g>
                    </g>
                </g>
            </svg>
        `;

        const furinaQuotes = [
            "Hãy để Furina xem ngươi viết gì nào~ 💧",
            "Ồ! Câu lệnh này nghe thú vị đấy! ✨",
            "Đừng quên thưởng bánh ngọt cho ta nhé! 🍰",
            "Thủy Thần Furina đang giám sát từng chữ đây! ♪",
            "Cứ gõ tiếp đi, ta đang đọc cùng ngươi nè~ 🌊"
        ];
        let quoteIdx = 0;
        let bubbleTimer = null;

        wrap.addEventListener("click", (e) => {
            e.stopPropagation();
            const bubble = wrap.querySelector("#ag-furina-bubble");
            if (bubble) {
                bubble.textContent = furinaQuotes[quoteIdx % furinaQuotes.length];
                quoteIdx++;
                bubble.classList.add("show");
                clearTimeout(bubbleTimer);
                bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 2800);
            }
            furina3DState.bounceVel = 1800;
            furina3DState.spinTarget += Math.PI * 2;
            spawnHydroParticle();
            spawnHydroParticle();
            wrap.classList.remove("ag-cheering");
            void wrap.offsetWidth;
            wrap.classList.add("ag-cheering");
            setTimeout(() => wrap.classList.remove("ag-cheering"), 600);
        });

        card.appendChild(wrap);
        if (!config.petUrl || config.petUrl === "furina-3d") {
            initFurina3DEngine();
        }
    }

    // Eye & Head Tracking + Typing Animation State
    let typingTimer = null;
    let tapToggle = false;
    let lastCaretX = null;
    let lastCaretY = null;

    function lookAtPoint(targetX, targetY, isTypingNow) {
        const furina = document.getElementById("ag-furina-companion");
        if (!furina || furina.classList.contains("ag-hidden")) return;

        const rect = furina.getBoundingClientRect();
        if (rect.width === 0) return;

        const centerX = rect.left + rect.width * 0.5;
        const centerY = rect.top + rect.height * 0.52;

        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const dist = Math.hypot(dx, dy) || 1;

        // Calculate normalized pupil offset (max ~3.8px X, ~3.2px Y)
        const maxPx = 3.8;
        const maxPy = 3.2;
        const factor = Math.min(1, dist / 240);
        const px = (dx / dist) * maxPx * factor;
        const py = (dy / dist) * maxPy * factor;

        furina.querySelectorAll(".ag-furina-pupil").forEach(p => {
            p.style.transform = `translate(${px.toFixed(2)}px, ${py.toFixed(2)}px)`;
        });

        // Calculate head tilt & 3D rotation toward the text being typed
        const normX = Math.max(-1, Math.min(1, dx / 320));
        const normY = Math.max(-1, Math.min(1, dy / 180));
        const rotDeg = normX * 9.5;
        const hx = normX * 3.5;
        const hy = normY * 2.5 + (isTypingNow ? 1.5 : 0);

        furina3DState.targetYaw = normX * 0.58;
        furina3DState.targetPitch = -normY * 0.32 - (isTypingNow ? 0.08 : 0);
        furina3DState.targetRoll = -normX * 0.14;

        const head = furina.querySelector("#ag-furina-head");
        if (head) {
            head.style.transform = `translate(${hx.toFixed(2)}px, ${hy.toFixed(2)}px) rotate(${rotDeg.toFixed(2)}deg)`;
        }
        const customImg = furina.querySelector("#ag-furina-custom-img");
        if (customImg && customImg.style.display !== "none") {
            customImg.style.transform = `translate(${hx.toFixed(2)}px, ${hy.toFixed(2)}px) rotate(${(rotDeg * 0.7).toFixed(2)}deg)`;
        }

        // If typing and followTyping is enabled, glide Furina slightly along the chat box top border to follow the text!
        if (isTypingNow && config.followTyping !== false) {
            const card = furina.parentElement;
            if (card) {
                const cardRect = card.getBoundingClientRect();
                const relCaretX = Math.max(40, Math.min(cardRect.width - 60, targetX - cardRect.left));
                const desiredRight = Math.max(14, Math.min(cardRect.width - 120, (cardRect.width - relCaretX) * 0.35 + 14));
                furina.style.right = `${desiredRight.toFixed(0)}px`;
            }
        }
    }

    function getCaretCoordinates() {
        const ed = document.querySelector('.surface-composer-card [contenteditable="true"], .surface-composer-card textarea, textarea');
        if (!ed) return null;

        const edRect = ed.getBoundingClientRect();
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && ed.contains(sel.anchorNode)) {
            const range = sel.getRangeAt(0).cloneRange();
            range.collapse(true);
            const clientRects = range.getClientRects();
            if (clientRects && clientRects.length > 0) {
                const r = clientRects[0];
                if (r.left > 0 || r.top > 0) {
                    lastCaretX = r.left;
                    lastCaretY = r.top + r.height * 0.5;
                    return { x: lastCaretX, y: lastCaretY };
                }
            }
            const rect = range.getBoundingClientRect();
            if (rect && (rect.left > 0 || rect.top > 0)) {
                lastCaretX = rect.left;
                lastCaretY = rect.top + rect.height * 0.5;
                return { x: lastCaretX, y: lastCaretY };
            }
            const textLen = (ed.textContent || "").length;
            const estX = edRect.left + 12 + ((textLen * 7.5) % Math.max(120, edRect.width - 30));
            const estY = edRect.top + 18 + Math.floor((textLen * 7.5) / Math.max(120, edRect.width - 30)) * 22;
            return { x: estX, y: estY };
        }

        if (lastCaretX && lastCaretY) {
            return { x: lastCaretX, y: lastCaretY };
        }
        return { x: edRect.left + 20, y: edRect.top + 20 };
    }

    function spawnHydroParticle() {
        const furina = document.getElementById("ag-furina-companion");
        if (!furina || furina.classList.contains("ag-hidden")) return;
        if (furina.querySelectorAll(".ag-hydro-particle").length > 4) return;

        const symbols = ["💧", "♪", "✦", "🫧", "♫"];
        const p = document.createElement("span");
        p.className = "ag-hydro-particle";
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const leftPx = 14 + Math.random() * 78;
        const tx = -14 + Math.random() * 28;
        p.style.left = `${leftPx}px`;
        p.style.top = "12px";
        p.style.setProperty("--tx", `${tx}px`);
        furina.appendChild(p);
        setTimeout(() => p.remove(), 750);
    }

    function triggerFurinaTyping(e) {
        if (config.followTyping === false) return;
        const furina = document.getElementById("ag-furina-companion");
        if (!furina || furina.classList.contains("ag-hidden")) return;

        if (e && e.key === "Enter" && !e.shiftKey) {
            furina.classList.remove("ag-typing", "ag-tap-l", "ag-tap-r");
            furina.classList.add("ag-cheering");
            furina3DState.bounceVel = 2200;
            furina3DState.spinTarget += Math.PI * 2;
            spawnHydroParticle();
            spawnHydroParticle();
            setTimeout(() => furina.classList.remove("ag-cheering"), 600);
            return;
        }

        furina.classList.add("ag-typing");
        tapToggle = !tapToggle;
        furina.classList.toggle("ag-tap-l", tapToggle);
        furina.classList.toggle("ag-tap-r", !tapToggle);

        furina3DState.bounceVel = 950;
        furina3DState.wiggleAmp = 0.14;

        if (Math.random() < 0.35) {
            spawnHydroParticle();
        }

        requestAnimationFrame(() => {
            const pt = getCaretCoordinates();
            if (pt) lookAtPoint(pt.x, pt.y, true);
        });

        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            furina.classList.remove("ag-typing", "ag-tap-l", "ag-tap-r");
        }, 320);
    }

    function translateDOM(lang) {
        if (!document.body) return;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
            const p = node.parentElement;
            if (!p) continue;
            const tag = p.tagName;
            if (tag === "SCRIPT" || tag === "STYLE" || tag === "CODE" || tag === "PRE" || tag === "TEXTAREA") continue;
            if (p.closest("#ag-settings-mod-pane") || p.closest("#ag-mod-quick-modal") || p.closest("#ag-furina-companion")) continue;

            const raw = node.nodeValue;
            const val = raw.trim();
            if (!val) continue;

            if (lang === "EN" && node.__agOrigText && raw === node.__agTranslatedText) {
                node.nodeValue = node.__agOrigText;
                continue;
            }

            const translated = translateDynamicString(val, lang);
            if (translated && translated !== val) {
                if (lang === "VI" && (!node.__agOrigText || raw !== node.__agTranslatedText)) {
                    node.__agOrigText = raw;
                }
                const nextVal = raw.replace(val, translated);
                node.__agTranslatedText = nextVal;
                node.nodeValue = nextVal;
            }
        }

        document.querySelectorAll("[placeholder], [data-placeholder], [title], [aria-label]").forEach(el => {
            if (el.closest("#ag-settings-mod-pane") || el.closest("#ag-mod-quick-modal") || el.closest("#ag-furina-companion")) return;
            ["placeholder", "data-placeholder", "title", "aria-label"].forEach(attr => {
                const cur = el.getAttribute(attr);
                if (!cur) return;
                const origKey = `agOrig_${attr}`;
                const transKey = `agTrans_${attr}`;
                if (lang === "EN" && el[origKey] && cur === el[transKey]) {
                    el.setAttribute(attr, el[origKey]);
                    return;
                }
                const tr = translateDynamicString(cur.trim(), lang);
                if (tr && tr !== cur.trim()) {
                    if (lang === "VI" && (!el[origKey] || cur !== el[transKey])) {
                        el[origKey] = cur;
                    }
                    el[transKey] = tr;
                    el.setAttribute(attr, tr);
                }
            });
        });
    }

    function switchLanguage(targetLang) {
        const overlay = document.getElementById("ag-lang-overlay");
        const textEl = document.getElementById("ag-overlay-text");
        const langBtn = document.getElementById("ag-lang-btn");
        if (overlay && textEl) {
            textEl.textContent = targetLang === "VI" ? "Đang đổi ngôn ngữ sang Tiếng Việt..." : "Switching language to English...";
            overlay.classList.add("active");
        }
        setTimeout(() => {
            currentLang = targetLang;
            localStorage.setItem("ag_mod_lang", currentLang);
            if (langBtn) langBtn.textContent = currentLang === "VI" ? "VI" : "ENG";
            translateDOM(currentLang);
            syncSettingsModPaneValues();
        }, 450);
        setTimeout(() => {
            if (overlay) overlay.classList.remove("active");
        }, 950);
    }

    function buildSettingsModPane() {
        const pane = document.createElement("div");
        pane.id = "ag-settings-mod-pane";
        pane.innerHTML = `
            <div class="ag-mod-header">
                <h2><span>✨ Antigravity Mod</span></h2>
                <p>Tùy chỉnh nhân vật Furina tương tác, hình nền, độ mờ, màu chủ đạo và ngôn ngữ Tiếng Việt (Phím tắt mở nhanh: <b>Alt + M</b>).</p>
            </div>

            <div class="ag-mod-section">
                <div class="ag-mod-section-title">Ngôn ngữ & Thanh công cụ</div>
                <div class="ag-mod-card">
                    <div class="ag-mod-row">
                        <div>
                            <div class="ag-mod-label">Ngôn ngữ giao diện (Language)</div>
                            <div class="ag-mod-desc">Chuyển đổi nhanh giữa Tiếng Việt và Tiếng Anh (Phím tắt: Alt + L)</div>
                        </div>
                        <div style="display:flex;gap:8px;">
                            <button type="button" class="ag-btn" id="ag-pane-lang-vi">🇻🇳 Tiếng Việt</button>
                            <button type="button" class="ag-btn" id="ag-pane-lang-en">🇬🇧 English</button>
                        </div>
                    </div>
                    <div class="ag-mod-row">
                        <div>
                            <div class="ag-mod-label">Hiện nút [VI / ENG] trên góc phải</div>
                            <div class="ag-mod-desc">Hiển thị nút chuyển đổi ngôn ngữ nhanh trên thanh tiêu đề</div>
                        </div>
                        <input type="checkbox" id="ag-pane-show-langbtn" style="width:18px;height:18px;accent-color:var(--ag-accent);cursor:pointer;">
                    </div>
                </div>
            </div>

            <div class="ag-mod-section">
                <div class="ag-mod-section-title">Nhân vật đồng hành & Tương tác khi Chat</div>
                <div class="ag-mod-card">
                    <div class="ag-mod-row">
                        <div>
                            <div class="ag-mod-label">Hiệu ứng nhìn theo chữ khi đang gõ (Eye & Head Tracking)</div>
                            <div class="ag-mod-desc">Furina sẽ nghiêng đầu, đảo mắt nhìn theo từng chữ bạn gõ và nhảy mừng khi nhấn Enter</div>
                        </div>
                        <input type="checkbox" id="ag-pane-follow-typing" style="width:18px;height:18px;accent-color:var(--ag-accent);cursor:pointer;">
                    </div>
                    <div class="ag-mod-row-col">
                        <div class="ag-mod-label">Chọn nhân vật hoặc dán link ảnh (PNG / GIF)</div>
                        <input type="text" class="ag-mod-input" id="ag-pane-pet" placeholder="Nhập 'furina-3d', 'furina-live' hoặc dán link ảnh PNG/GIF...">
                        <div class="ag-chips">
                            <span class="ag-chip" data-pet="furina-3d">🧊 Furina 3D Chibi (Mặc định)</span>
                            <span class="ag-chip" data-pet="furina-live">💧 Furina 2D Chibi</span>
                            <span class="ag-chip" data-pet="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Fox.png">🦊 Cáo Fox</span>
                            <span class="ag-chip" data-pet="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20With%20Wry%20Smile.png">🐱 Mèo Cat</span>
                            <span class="ag-chip" data-pet="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Panda.png">🐼 Gấu Trúc</span>
                            <span class="ag-chip" data-pet="none">🚫 Ẩn nhân vật</span>
                        </div>
                    </div>

                    <div class="ag-mod-row">
                        <div>
                            <div class="ag-mod-label">Màu viền chủ đạo (Accent Hex)</div>
                            <div class="ag-mod-desc">Màu viền khung nhập chat và các nút điểm nhấn</div>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <div style="display:flex;gap:6px;">
                                <div class="ag-swatch" data-acc="#3b82f6" style="background:#3b82f6" title="Xanh Thủy Thần Furina"></div>
                                <div class="ag-swatch" data-acc="#38bdf8" style="background:#38bdf8" title="Xanh Băng Fontaine"></div>
                                <div class="ag-swatch" data-acc="#6366f1" style="background:#6366f1" title="Tím Indigo"></div>
                                <div class="ag-swatch" data-acc="#ec4899" style="background:#ec4899" title="Hồng Neon"></div>
                                <div class="ag-swatch" data-acc="#10b981" style="background:#10b981" title="Xanh Ngọc"></div>
                                <div class="ag-swatch" data-acc="#7c4a32" style="background:#7c4a32" title="Nâu Cổ Điển"></div>
                            </div>
                            <input type="color" id="ag-pane-acc-picker" style="width:32px;height:32px;border:none;background:transparent;cursor:pointer;">
                            <input type="text" class="ag-mod-input" id="ag-pane-acc" style="width:95px;">
                        </div>
                    </div>
                </div>
            </div>

            <div class="ag-mod-section">
                <div class="ag-mod-section-title">Hình nền (Background)</div>
                <div class="ag-mod-card">
                    <div class="ag-mod-row-col">
                        <div class="ag-mod-label">Link ảnh nền (URL)</div>
                        <input type="text" class="ag-mod-input" id="ag-pane-bg" placeholder="Dán link ảnh nền (JPG, PNG, WebP, GIF)...">
                        <div class="ag-chips">
                            <span class="ag-chip" data-bg="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920">🌲 Rừng Đêm (Mặc định)</span>
                            <span class="ag-chip" data-bg="https://raw.githubusercontent.com/siloneedsleep/antigravity-mod/main/assets/furina-3d/furiba.png">🏛️ Nhà Hát Fontaine</span>
                            <span class="ag-chip" data-bg="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920">🌌 Cyberpunk Neon</span>
                            <span class="ag-chip" data-bg="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920">✨ Vũ Trụ Tinh Vân</span>
                            <span class="ag-chip" data-bg="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920">🏔️ Sương Mù Núi</span>
                            <span class="ag-chip" data-bg="">🚫 Tắt ảnh nền</span>
                        </div>
                    </div>
                    <div class="ag-mod-row-col">
                        <div class="ag-mod-row">
                            <div class="ag-mod-label">Độ mờ hình nền (Opacity)</div>
                            <span id="ag-pane-op-val" style="font-size:12px;font-weight:600;color:var(--ag-accent);">0.16</span>
                        </div>
                        <input type="range" min="0" max="0.80" step="0.01" id="ag-pane-op" style="width:100%;accent-color:var(--ag-accent);cursor:pointer;">
                    </div>
                </div>
            </div>

            <div class="ag-mod-section">
                <div class="ag-mod-section-title">Cập nhật tự động từ GitHub (Auto-Updater)</div>
                <div class="ag-mod-card">
                    <div class="ag-mod-row">
                        <div>
                            <div class="ag-mod-label">Phiên bản Mod đang cài đặt</div>
                            <div class="ag-mod-desc" id="ag-pane-ver-desc">Kho lưu trữ: <b>siloneedsleep/antigravity-mod</b> • Mã bản dựng: <code id="ag-pane-cur-sha">#latest</code></div>
                        </div>
                        <div style="display:flex;gap:8px;">
                            <button type="button" class="ag-btn ag-btn-primary" id="ag-pane-check-upd">🔄 Kiểm tra cập nhật</button>
                        </div>
                    </div>
                    <div class="ag-mod-row">
                        <div>
                            <div class="ag-mod-label">Tự động kiểm tra bản mới mỗi khi mở Antigravity</div>
                            <div class="ag-mod-desc">Hiển thị pop-up mờ thông báo khi phát hiện commit mới trên GitHub và tự khởi động lại sau khi cập nhật</div>
                        </div>
                        <input type="checkbox" id="ag-pane-auto-upd" style="width:18px;height:18px;accent-color:var(--ag-accent);cursor:pointer;">
                    </div>
                </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;">
                <span class="ag-toast-saved" id="ag-pane-saved-msg">✓ Đã lưu và áp dụng cài đặt!</span>
                <div style="display:flex;gap:10px;">
                    <button type="button" class="ag-btn ag-btn-ghost" id="ag-pane-reset">Khôi phục mặc định</button>
                    <button type="button" class="ag-btn ag-btn-primary" id="ag-pane-save">Lưu thay đổi</button>
                </div>
            </div>
        `;

        const showToast = () => {
            const msg = pane.querySelector("#ag-pane-saved-msg");
            if (msg) {
                msg.classList.add("show");
                setTimeout(() => msg.classList.remove("show"), 2000);
            }
        };

        const saveFromPane = () => {
            config.bgUrl = pane.querySelector("#ag-pane-bg").value.trim();
            config.bgOpacity = pane.querySelector("#ag-pane-op").value.trim();
            config.petUrl = pane.querySelector("#ag-pane-pet").value.trim() || "furina-3d";
            config.accent = pane.querySelector("#ag-pane-acc").value.trim();
            config.showLangBtn = pane.querySelector("#ag-pane-show-langbtn").checked;
            config.followTyping = pane.querySelector("#ag-pane-follow-typing").checked;
            config.autoCheckUpdate = pane.querySelector("#ag-pane-auto-upd").checked;
            localStorage.setItem("ag_mod_config", JSON.stringify(config));
            applyConfig();
            syncSettingsModPaneValues();
            showToast();
        };

        pane.querySelector("#ag-pane-lang-vi").onclick = () => {
            if (currentLang !== "VI") switchLanguage("VI");
        };
        pane.querySelector("#ag-pane-lang-en").onclick = () => {
            if (currentLang !== "EN") switchLanguage("EN");
        };
        pane.querySelector("#ag-pane-show-langbtn").onchange = saveFromPane;
        pane.querySelector("#ag-pane-follow-typing").onchange = saveFromPane;
        pane.querySelector("#ag-pane-auto-upd").onchange = saveFromPane;
        pane.querySelector("#ag-pane-check-upd").onclick = () => checkForGitHubUpdates(true);

        pane.querySelectorAll("[data-bg]").forEach(chip => {
            chip.onclick = () => {
                pane.querySelector("#ag-pane-bg").value = chip.getAttribute("data-bg");
                saveFromPane();
            };
        });

        pane.querySelector("#ag-pane-op").oninput = (e) => {
            pane.querySelector("#ag-pane-op-val").textContent = e.target.value;
            config.bgOpacity = e.target.value;
            applyConfig();
        };
        pane.querySelector("#ag-pane-op").onchange = saveFromPane;

        pane.querySelectorAll("[data-pet]").forEach(chip => {
            chip.onclick = () => {
                pane.querySelector("#ag-pane-pet").value = chip.getAttribute("data-pet");
                saveFromPane();
            };
        });

        pane.querySelectorAll("[data-acc]").forEach(sw => {
            sw.onclick = () => {
                const hex = sw.getAttribute("data-acc");
                pane.querySelector("#ag-pane-acc").value = hex;
                pane.querySelector("#ag-pane-acc-picker").value = hex;
                saveFromPane();
            };
        });

        pane.querySelector("#ag-pane-acc-picker").oninput = (e) => {
            pane.querySelector("#ag-pane-acc").value = e.target.value;
            config.accent = e.target.value;
            applyConfig();
        };
        pane.querySelector("#ag-pane-acc-picker").onchange = saveFromPane;

        pane.querySelector("#ag-pane-save").onclick = saveFromPane;
        pane.querySelector("#ag-pane-reset").onclick = () => {
            config = Object.assign({}, defaultConfig);
            localStorage.setItem("ag_mod_config", JSON.stringify(config));
            applyConfig();
            syncSettingsModPaneValues();
            showToast();
        };

        return pane;
    }

    function syncSettingsModPaneValues() {
        const curSha = (localStorage.getItem("ag_mod_installed_sha") || "6e83ec8").slice(0, 7);
        const pane = document.getElementById("ag-settings-mod-pane");
        if (pane) {
            const bgInp = pane.querySelector("#ag-pane-bg");
            const opInp = pane.querySelector("#ag-pane-op");
            const opVal = pane.querySelector("#ag-pane-op-val");
            const petInp = pane.querySelector("#ag-pane-pet");
            const accInp = pane.querySelector("#ag-pane-acc");
            const accPick = pane.querySelector("#ag-pane-acc-picker");
            const showBtn = pane.querySelector("#ag-pane-show-langbtn");
            const followBtn = pane.querySelector("#ag-pane-follow-typing");
            const autoUpdBtn = pane.querySelector("#ag-pane-auto-upd");
            const curShaEl = pane.querySelector("#ag-pane-cur-sha");
            const btnVi = pane.querySelector("#ag-pane-lang-vi");
            const btnEn = pane.querySelector("#ag-pane-lang-en");

            if (bgInp) bgInp.value = config.bgUrl;
            if (opInp) opInp.value = config.bgOpacity;
            if (opVal) opVal.textContent = config.bgOpacity;
            if (petInp) petInp.value = config.petUrl;
            if (accInp) accInp.value = config.accent;
            if (accPick && /^#[0-9a-fA-F]{6}$/.test(config.accent)) accPick.value = config.accent;
            if (showBtn) showBtn.checked = config.showLangBtn !== false;
            if (followBtn) followBtn.checked = config.followTyping !== false;
            if (autoUpdBtn) autoUpdBtn.checked = config.autoCheckUpdate !== false;
            if (curShaEl) curShaEl.textContent = "#" + curSha;
            if (btnVi && btnEn) {
                btnVi.className = "ag-btn " + (currentLang === "VI" ? "ag-btn-primary" : "ag-btn-ghost");
                btnEn.className = "ag-btn " + (currentLang === "EN" ? "ag-btn-primary" : "ag-btn-ghost");
            }
        }

        const qModal = document.getElementById("ag-mod-quick-modal");
        if (qModal) {
            const qBg = qModal.querySelector("#ag-inp-bg");
            const qOp = qModal.querySelector("#ag-inp-op");
            const qPet = qModal.querySelector("#ag-inp-pet");
            const qAcc = qModal.querySelector("#ag-inp-acc");
            const qFollow = qModal.querySelector("#ag-inp-follow");
            const qSha = qModal.querySelector("#ag-q-sha");
            if (qBg) qBg.value = config.bgUrl;
            if (qOp) qOp.value = config.bgOpacity;
            if (qPet) qPet.value = config.petUrl;
            if (qAcc) qAcc.value = config.accent;
            if (qFollow) qFollow.checked = config.followTyping !== false;
            if (qSha) qSha.textContent = "#" + curSha;
        }
    }

    // GitHub Auto-Updater Engine & Blurred Modal
    let latestRemoteCommit = null;

    function ensureUpdateModal() {
        let backdrop = document.getElementById("ag-update-backdrop");
        if (backdrop) return backdrop;

        backdrop = document.createElement("div");
        backdrop.id = "ag-update-backdrop";
        backdrop.innerHTML = `
            <div id="ag-update-modal">
                <div class="ag-upd-badge" id="ag-upd-badge">✨ BẢN CẬP NHẬT MỚI TỪ GITHUB</div>
                <h3 class="ag-upd-title" id="ag-upd-title">💧 Phát hiện bản cập nhật Antigravity Mod!</h3>
                <p class="ag-upd-sub" id="ag-upd-sub">Đã có phiên bản mới trên kho lưu trữ <b>siloneedsleep/antigravity-mod</b>. Bạn có muốn tải về và khởi động lại ứng dụng ngay không?</p>
                <div class="ag-upd-versions">
                    <span class="ag-upd-ver-pill" id="ag-upd-ver-cur">Hiện tại: #6e83ec8</span>
                    <span style="color:#64748b;">➔</span>
                    <span class="ag-upd-ver-pill new" id="ag-upd-ver-new">Mới nhất: #latest</span>
                </div>
                <div class="ag-upd-notes" id="ag-upd-notes">Đang tải thông tin chi tiết...</div>
                <div class="ag-upd-progress-wrap" id="ag-upd-progress-wrap">
                    <div class="ag-upd-progress-track">
                        <div class="ag-upd-progress-bar" id="ag-upd-progress-bar"></div>
                    </div>
                    <div class="ag-upd-status" id="ag-upd-status">Đang kết nối tới GitHub...</div>
                </div>
                <div class="ag-actions" id="ag-upd-actions">
                    <button type="button" class="ag-btn ag-btn-ghost" id="ag-upd-later">Để sau</button>
                    <button type="button" class="ag-btn ag-btn-ghost" id="ag-upd-github">Xem GitHub ↗</button>
                    <button type="button" class="ag-btn ag-btn-primary" id="ag-upd-confirm">🚀 Cập nhật & Khởi động lại</button>
                </div>
            </div>
        `;
        document.body.appendChild(backdrop);

        backdrop.querySelector("#ag-upd-later").onclick = () => {
            backdrop.classList.remove("open");
            if (latestRemoteCommit && latestRemoteCommit.sha) {
                sessionStorage.setItem("ag_mod_dismissed_sha", latestRemoteCommit.sha);
            }
        };
        backdrop.querySelector("#ag-upd-github").onclick = () => {
            window.open("https://github.com/siloneedsleep/antigravity-mod/commits/main", "_blank");
        };
        backdrop.querySelector("#ag-upd-confirm").onclick = () => {
            if (latestRemoteCommit) performGitHubUpdate(latestRemoteCommit);
        };
        return backdrop;
    }

    function openUpdatePopup(commitInfo, isAlreadyLatest) {
        latestRemoteCommit = commitInfo;
        const backdrop = ensureUpdateModal();
        const curSha = (localStorage.getItem("ag_mod_installed_sha") || "6e83ec8").slice(0, 7);
        const newSha = (commitInfo.sha || "latest").slice(0, 7);

        backdrop.querySelector("#ag-upd-badge").textContent = isAlreadyLatest
            ? "✓ ĐANG Ở PHIÊN BẢN MỚI NHẤT"
            : "✨ BẢN CẬP NHẬT MỚI TỪ GITHUB";
        backdrop.querySelector("#ag-upd-title").textContent = isAlreadyLatest
            ? "💧 Antigravity Mod đã là bản mới nhất!"
            : "💧 Phát hiện bản cập nhật Antigravity Mod!";
        backdrop.querySelector("#ag-upd-sub").innerHTML = isAlreadyLatest
            ? "Bạn đang sử dụng phiên bản mới nhất từ <b>siloneedsleep/antigravity-mod</b>. Bạn vẫn có thể bấm cập nhật lại để làm mới toàn bộ tệp và khởi động lại ứng dụng."
            : "Đã có bản cập nhật mới trên kho lưu trữ <b>siloneedsleep/antigravity-mod</b>. Nhấn Cập nhật để tự động tải về và khởi động lại Antigravity.";
        backdrop.querySelector("#ag-upd-ver-cur").textContent = `Đang dùng: #${curSha}`;
        backdrop.querySelector("#ag-upd-ver-new").textContent = `GitHub: #${newSha}`;
        backdrop.querySelector("#ag-upd-notes").textContent = `📝 Nội dung cập nhật (#${newSha}):\n${commitInfo.message || "Cập nhật tính năng & giao diện Tiếng Việt"}\n\n🕒 Thời gian: ${commitInfo.dateStr || "Vừa cập nhật"}`;
        backdrop.querySelector("#ag-upd-progress-wrap").classList.remove("active");
        backdrop.querySelector("#ag-upd-progress-bar").style.width = "0%";
        backdrop.querySelector("#ag-upd-confirm").disabled = false;
        backdrop.querySelector("#ag-upd-confirm").textContent = isAlreadyLatest
            ? "🔄 Cài đặt lại & Khởi động lại"
            : "🚀 Cập nhật & Khởi động lại";

        backdrop.classList.add("open");

        // Furina excited bubble notification
        const bubble = document.getElementById("ag-furina-bubble");
        if (bubble && !isAlreadyLatest) {
            bubble.textContent = "Ồ! Trên GitHub vừa có bản cập nhật mới kìa! Mau cập nhật cho ta đi~ 💧✨";
            bubble.classList.add("show");
            furina3DState.bounceVel = 1800;
            setTimeout(() => bubble.classList.remove("show"), 4500);
        }
    }

    async function performGitHubUpdate(commitInfo) {
        const backdrop = ensureUpdateModal();
        const progWrap = backdrop.querySelector("#ag-upd-progress-wrap");
        const progBar = backdrop.querySelector("#ag-upd-progress-bar");
        const statusEl = backdrop.querySelector("#ag-upd-status");
        const confirmBtn = backdrop.querySelector("#ag-upd-confirm");
        const laterBtn = backdrop.querySelector("#ag-upd-later");

        confirmBtn.disabled = true;
        laterBtn.disabled = true;
        confirmBtn.textContent = "⏳ Đang cập nhật...";
        progWrap.classList.add("active");

        try {
            const ref = commitInfo.sha || "main";
            const rawBase = `https://raw.githubusercontent.com/siloneedsleep/antigravity-mod/${ref}`;

            progBar.style.width = "28%";
            statusEl.textContent = "Đang tải gói giao diện (src/styles.css) từ GitHub...";
            const cssRes = await fetch(`${rawBase}/src/styles.css?t=${Date.now()}`, { cache: "no-store" });
            if (!cssRes.ok) throw new Error("Không thể tải src/styles.css (" + cssRes.status + ")");
            const newCss = await cssRes.text();

            progBar.style.width = "68%";
            statusEl.textContent = "Đang tải nhân xử lý (src/mod.js) & cấu hình Furina 3D...";
            const jsRes = await fetch(`${rawBase}/src/mod.js?t=${Date.now()}`, { cache: "no-store" });
            if (!jsRes.ok) throw new Error("Không thể tải src/mod.js (" + jsRes.status + ")");
            const newJs = await jsRes.text();

            progBar.style.width = "92%";
            statusEl.textContent = "Đang biên dịch và ghi đè vào bộ nhớ ứng dụng...";
            const placeholderToken = "__" + "AG_CSS_JSON" + "__";
            const compiledBundle = newJs.replace(placeholderToken, JSON.stringify(newCss));

            localStorage.setItem("ag_mod_cached_bundle", compiledBundle);
            localStorage.setItem("ag_mod_installed_sha", commitInfo.sha);
            localStorage.setItem("ag_mod_installed_msg", commitInfo.message || "");
            localStorage.setItem("ag_mod_just_updated", commitInfo.sha.slice(0, 7));
            sessionStorage.removeItem("ag_mod_checked_session");

            progBar.style.width = "100%";
            statusEl.textContent = "✓ Cập nhật hoàn tất! Đang khởi động lại Antigravity...";

            setTimeout(() => {
                window.location.reload();
            }, 900);
        } catch (err) {
            statusEl.textContent = "❌ Lỗi khi tải bản cập nhật: " + (err.message || String(err));
            confirmBtn.disabled = false;
            laterBtn.disabled = false;
            confirmBtn.textContent = "Thử lại";
        }
    }

    async function checkForGitHubUpdates(isManual) {
        if (!isManual && config.autoCheckUpdate === false) return;
        if (!isManual && sessionStorage.getItem("ag_mod_checked_session") === "1") return;

        try {
            let sha = "";
            let message = "";
            let dateStr = "";

            const res = await fetch("https://api.github.com/repos/siloneedsleep/antigravity-mod/commits/main", {
                cache: "no-store",
                headers: { "Accept": "application/vnd.github.v3+json" }
            });
            if (res.ok) {
                const data = await res.json();
                sha = data.sha || "";
                message = (data.commit && data.commit.message) || "";
                if (data.commit && data.commit.committer && data.commit.committer.date) {
                    dateStr = new Date(data.commit.committer.date).toLocaleString("vi-VN");
                }
            } else {
                const vRes = await fetch(`https://raw.githubusercontent.com/siloneedsleep/antigravity-mod/main/version.json?t=${Date.now()}`, { cache: "no-store" });
                if (vRes.ok) {
                    const vData = await vRes.json();
                    sha = vData.sha || "";
                    message = vData.message || "";
                    dateStr = vData.date || "";
                }
            }

            if (!sha) return;
            sessionStorage.setItem("ag_mod_checked_session", "1");

            const installedSha = localStorage.getItem("ag_mod_installed_sha") || "";
            if (!installedSha) {
                localStorage.setItem("ag_mod_installed_sha", sha);
                syncSettingsModPaneValues();
                if (isManual) {
                    openUpdatePopup({ sha, message, dateStr }, true);
                }
                return;
            }

            const isNewer = installedSha.slice(0, 7) !== sha.slice(0, 7);
            if (isNewer) {
                if (!isManual && sessionStorage.getItem("ag_mod_dismissed_sha") === sha) return;
                openUpdatePopup({ sha, message, dateStr }, false);
            } else if (isManual) {
                openUpdatePopup({ sha, message, dateStr }, true);
            }
        } catch (err) {
            console.warn("[Antigravity Mod] GitHub update check skipped:", err);
        }
    }

    function showPostUpdateToast() {
        const justUpdatedSha = localStorage.getItem("ag_mod_just_updated");
        if (!justUpdatedSha) return;
        localStorage.removeItem("ag_mod_just_updated");

        let toast = document.getElementById("ag-update-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "ag-update-toast";
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>✨</span><span>Đã cập nhật <b>Antigravity Mod</b> lên bản <code>#${justUpdatedSha}</code> thành công!</span>`;
        requestAnimationFrame(() => toast.classList.add("show"));
        setTimeout(() => toast.classList.remove("show"), 4500);

        setTimeout(() => {
            const bubble = document.getElementById("ag-furina-bubble");
            if (bubble) {
                bubble.textContent = `Yay! Ta vừa được nâng cấp lên phiên bản #${justUpdatedSha} mới nhất rồi nè~ 💧✨`;
                bubble.classList.add("show");
                furina3DState.bounceVel = 2200;
                furina3DState.spinTarget += Math.PI * 2;
                setTimeout(() => bubble.classList.remove("show"), 4200);
            }
        }, 600);
    }

    function ensureSettingsModTab() {
        const sidebars = document.querySelectorAll('[data-testid="settings-sidebar"]');
        sidebars.forEach(sb => {
            const firstList = sb.querySelector(".flex.flex-col.gap-0\\.5");
            if (firstList && !sb.querySelector(".ag-settings-nav-mod")) {
                const wrap = document.createElement("div");
                wrap.className = "relative group/nav-item mx-2 ag-settings-nav-wrap";
                wrap.innerHTML = `
                    <button type="button" data-testid="settings-nav-item-AntigravityMod" class="ag-settings-nav-mod flex items-center gap-1.5 w-full px-2 py-1 rounded-lg cursor-pointer border-none text-left transition-all outline-none hover:bg-sidebar-muted">
                        <span class="text-sm transition-colors select-none truncate flex-1 text-secondary-foreground group-hover/nav-item:text-foreground">✨ Antigravity Mod</span>
                    </button>
                `;
                firstList.appendChild(wrap);
            }
        });

        const settingsDialog = document.querySelector('[aria-label="Settings"], .settings-modal-container') || document.getElementById("root");
        if (settingsDialog) {
            const contentGrow = settingsDialog.querySelector(".overflow-auto > .grow.w-full");
            if (contentGrow && !contentGrow.querySelector("#ag-settings-mod-pane")) {
                contentGrow.appendChild(buildSettingsModPane());
                syncSettingsModPaneValues();
            }
        }
    }

    function createUI() {
        if (!document.body) return;

        let langBtn = document.getElementById("ag-lang-btn");
        if (!langBtn) {
            langBtn = document.createElement("button");
            langBtn.id = "ag-lang-btn";
            document.body.appendChild(langBtn);
        }
        langBtn.textContent = currentLang === "VI" ? "VI" : "ENG";
        langBtn.style.display = config.showLangBtn === false ? "none" : "inline-flex";
        langBtn.onclick = () => switchLanguage(currentLang === "EN" ? "VI" : "EN");

        let overlay = document.getElementById("ag-lang-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "ag-lang-overlay";
            overlay.innerHTML = `<div class="ag-spinner"></div><div class="ag-text" id="ag-overlay-text">Đang đổi ngôn ngữ...</div>`;
            document.body.appendChild(overlay);
        }

        ensureUpdateModal();

        let modal = document.getElementById("ag-mod-quick-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "ag-mod-quick-modal";
            const curSha = (localStorage.getItem("ag_mod_installed_sha") || "6e83ec8").slice(0, 7);
            modal.innerHTML = `
                <h3><span>💧 Antigravity Mod (Alt + M)</span><span style="cursor:pointer" id="ag-mod-close">✕</span></h3>
                <div class="ag-field">
                    <label>Link ảnh nền (URL)</label>
                    <input type="text" id="ag-inp-bg" value="${config.bgUrl}">
                    <div class="ag-chips">
                        <span class="ag-chip" data-qbg="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920">🌲 Rừng Đêm</span>
                        <span class="ag-chip" data-qbg="https://raw.githubusercontent.com/siloneedsleep/antigravity-mod/main/assets/furina-3d/furiba.png">🏛️ Fontaine</span>
                        <span class="ag-chip" data-qbg="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920">🌌 Cyberpunk</span>
                        <span class="ag-chip" data-qbg="">🚫 Tắt nền</span>
                    </div>
                </div>
                <div class="ag-field">
                    <label>Độ mờ nền (0.00 - 0.80)</label>
                    <input type="number" step="0.02" min="0" max="0.8" id="ag-inp-op" value="${config.bgOpacity}">
                </div>
                <div class="ag-field">
                    <label>Nhân vật ('furina-3d', 'furina-live' hoặc link PNG/GIF)</label>
                    <input type="text" id="ag-inp-pet" value="${config.petUrl}">
                    <div class="ag-chips">
                        <span class="ag-chip" data-qpet="furina-3d">🧊 Furina 3D</span>
                        <span class="ag-chip" data-qpet="furina-live">💧 Furina 2D</span>
                        <span class="ag-chip" data-qpet="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Fox.png">🦊 Fox</span>
                        <span class="ag-chip" data-qpet="none">🚫 Ẩn</span>
                    </div>
                </div>
                <div class="ag-field" style="flex-direction:row;align-items:center;justify-content:space-between;margin-top:4px;">
                    <label style="cursor:pointer;" for="ag-inp-follow">Nhìn theo chữ khi đang chat (Eye Tracking)</label>
                    <input type="checkbox" id="ag-inp-follow" ${config.followTyping !== false ? "checked" : ""} style="width:16px;height:16px;accent-color:var(--ag-accent);cursor:pointer;">
                </div>
                <div class="ag-field">
                    <label>Màu viền chủ đạo (Hex)</label>
                    <input type="text" id="ag-inp-acc" value="${config.accent}">
                </div>
                <div class="ag-field" style="flex-direction:row;align-items:center;justify-content:space-between;background:rgba(30,41,59,0.55);padding:8px 10px;border-radius:8px;border:1px solid rgba(56,189,248,0.2);">
                    <span>Phiên bản GitHub: <code id="ag-q-sha" style="color:#7dd3fc;">#${curSha}</code></span>
                    <button type="button" class="ag-btn ag-btn-ghost" id="ag-q-check-upd" style="padding:4px 10px;font-size:11.5px;">🔄 Kiểm tra cập nhật</button>
                </div>
                <div class="ag-actions">
                    <button class="ag-btn ag-btn-ghost" id="ag-mod-reset">Mặc định</button>
                    <button class="ag-btn ag-btn-primary" id="ag-mod-save">Lưu thay đổi</button>
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelectorAll("[data-qbg]").forEach(c => {
                c.onclick = () => { modal.querySelector("#ag-inp-bg").value = c.getAttribute("data-qbg"); };
            });
            modal.querySelectorAll("[data-qpet]").forEach(c => {
                c.onclick = () => { modal.querySelector("#ag-inp-pet").value = c.getAttribute("data-qpet"); };
            });
            modal.querySelector("#ag-q-check-upd").onclick = () => {
                modal.classList.remove("open");
                checkForGitHubUpdates(true);
            };
            modal.querySelector("#ag-mod-close").onclick = () => modal.classList.remove("open");
            modal.querySelector("#ag-mod-save").onclick = () => {
                config.bgUrl = modal.querySelector("#ag-inp-bg").value.trim();
                config.bgOpacity = modal.querySelector("#ag-inp-op").value.trim();
                config.petUrl = modal.querySelector("#ag-inp-pet").value.trim() || "furina-3d";
                config.accent = modal.querySelector("#ag-inp-acc").value.trim();
                config.followTyping = modal.querySelector("#ag-inp-follow").checked;
                localStorage.setItem("ag_mod_config", JSON.stringify(config));
                applyConfig();
                syncSettingsModPaneValues();
                modal.classList.remove("open");
            };
            modal.querySelector("#ag-mod-reset").onclick = () => {
                config = Object.assign({}, defaultConfig);
                localStorage.setItem("ag_mod_config", JSON.stringify(config));
                applyConfig();
                syncSettingsModPaneValues();
                modal.classList.remove("open");
            };
        }
    }

    function onGlobalClick(e) {
        const modNavBtn = e.target.closest?.(".ag-settings-nav-mod");
        if (modNavBtn) {
            e.stopPropagation();
            ensureSettingsModTab();
            document.querySelectorAll('[data-testid="settings-sidebar"]').forEach(sb => sb.classList.add("ag-sidebar-mod-active"));
            document.querySelectorAll(".overflow-auto > .grow.w-full").forEach(cg => cg.classList.add("ag-mod-tab-active"));
            syncSettingsModPaneValues();
            return;
        }

        const otherSettingsBtn = e.target.closest?.('[data-testid="settings-sidebar"] button:not(.ag-settings-nav-mod)');
        if (otherSettingsBtn) {
            document.querySelectorAll('[data-testid="settings-sidebar"]').forEach(sb => sb.classList.remove("ag-sidebar-mod-active"));
            document.querySelectorAll(".overflow-auto > .grow.w-full").forEach(cg => cg.classList.remove("ag-mod-tab-active"));
        }

        if (e.target.closest?.(".surface-composer-card")) {
            requestAnimationFrame(() => {
                const pt = getCaretCoordinates();
                if (pt) lookAtPoint(pt.x, pt.y, false);
            });
        }
    }

    function onGlobalKeydown(e) {
        if (e.altKey && !e.ctrlKey && !e.metaKey && (e.code === "KeyM" || e.key === "m" || e.key === "M")) {
            e.preventDefault();
            e.stopPropagation();
            const qModal = document.getElementById("ag-mod-quick-modal");
            if (qModal) {
                syncSettingsModPaneValues();
                qModal.classList.toggle("open");
            }
            return;
        }
        if (e.key === "Escape") {
            const updModal = document.getElementById("ag-update-backdrop");
            if (updModal && updModal.classList.contains("open")) {
                updModal.classList.remove("open");
                return;
            }
            const qModal = document.getElementById("ag-mod-quick-modal");
            if (qModal && qModal.classList.contains("open")) {
                qModal.classList.remove("open");
                return;
            }
        }
        if (e.altKey && !e.ctrlKey && !e.metaKey && (e.code === "KeyL" || e.key === "l" || e.key === "L")) {
            e.preventDefault();
            e.stopPropagation();
            switchLanguage(currentLang === "EN" ? "VI" : "EN");
            return;
        }

        const active = document.activeElement;
        if (active && (active.getAttribute("contenteditable") === "true" || active.tagName === "TEXTAREA" || active.closest?.(".surface-composer-card"))) {
            triggerFurinaTyping(e);
        }
    }

    function onGlobalInput(e) {
        const t = e.target;
        if (t && (t.getAttribute?.("contenteditable") === "true" || t.tagName === "TEXTAREA" || t.closest?.(".surface-composer-card"))) {
            triggerFurinaTyping(e);
        }
    }

    function onGlobalMouseMove(e) {
        if (typingTimer && document.getElementById("ag-furina-companion")?.classList.contains("ag-typing")) return;
        lookAtPoint(e.clientX, e.clientY, false);
    }

    let obs = null;
    let blinkInterval = null;
    let rafPending = false;

    function init() {
        injectStyles();
        createUI();
        ensureFurinaCompanion();
        ensureSettingsModTab();
        applyConfig();
        translateDOM(currentLang);
        showPostUpdateToast();
        setTimeout(() => checkForGitHubUpdates(false), 1200);

        document.addEventListener("click", onGlobalClick, true);
        window.addEventListener("keydown", onGlobalKeydown, true);
        document.addEventListener("input", onGlobalInput, true);
        window.addEventListener("mousemove", onGlobalMouseMove, { passive: true });

        blinkInterval = setInterval(() => {
            const furina = document.getElementById("ag-furina-companion");
            if (furina && !furina.classList.contains("ag-typing")) {
                furina.classList.add("ag-blink");
                if (furina3DState.eyeMat) {
                    furina3DState.eyeMat.visible = false;
                }
                setTimeout(() => {
                    furina.classList.remove("ag-blink");
                    if (furina3DState.eyeMat) {
                        furina3DState.eyeMat.visible = true;
                    }
                }, 140);
            }
        }, 3600);

        obs = new MutationObserver(() => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => {
                rafPending = false;
                if (!document.getElementById("ag-mod-style")) injectStyles();
                if (!document.getElementById("ag-lang-btn")) createUI();
                ensureFurinaCompanion();
                ensureSettingsModTab();
                if (currentLang === "VI") translateDOM("VI");
            });
        });
        if (document.body) {
            obs.observe(document.body, { childList: true, subtree: true });
        }

        window.__agModCleanup = () => {
            if (obs) obs.disconnect();
            if (blinkInterval) clearInterval(blinkInterval);
            if (furina3DState.rafId) cancelAnimationFrame(furina3DState.rafId);
            if (furina3DState.renderer) {
                try { furina3DState.renderer.dispose(); } catch (e) {}
            }
            document.removeEventListener("click", onGlobalClick, true);
            window.removeEventListener("keydown", onGlobalKeydown, true);
            document.removeEventListener("input", onGlobalInput, true);
            window.removeEventListener("mousemove", onGlobalMouseMove);
        };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
/* AG_MOD_END */