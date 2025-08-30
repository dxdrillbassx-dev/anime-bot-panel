// Discord Bot Admin Panel - Vanilla JavaScript

class DiscordBotAdmin {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeLucideIcons();
        this.loadPageData();
        this.updateNavigation();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Search inputs
        this.setupSearchInputs();

        // Chat functionality
        this.setupChatInput();

        // User card clicks
        this.setupUserCardClicks();
    }

    initializeLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    navigateTo(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.currentPage = page;
        this.loadPageData();
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
        this.sidebarCollapsed = !this.sidebarCollapsed;
    }

    loadPageData() {
        switch (this.currentPage) {
            case 'videos':
                this.loadVideosData();
                break;
            case 'users':
                this.loadUsersData();
                break;
            case 'commands':
                this.loadCommandsData();
                break;
            case 'messenger':
                this.loadMessengerData();
                break;
        }
    }

    loadVideosData() {
        const videos = [
            {
                id: 1,
                title: "Epic Gaming Montage #1",
                thumbnail: "https://via.placeholder.com/400x225?text=Video+Thumbnail",
                duration: "3:24",
                size: "45.2 MB",
                uploadedBy: "User123",
                uploadDate: "2024-01-15",
                views: 1234,
                status: "active"
            },
            {
                id: 2,
                title: "Funny Moments Compilation",
                thumbnail: "https://via.placeholder.com/400x225?text=Video+Thumbnail",
                duration: "5:17",
                size: "78.3 MB",
                uploadedBy: "GamerPro",
                uploadDate: "2024-01-14",
                views: 856,
                status: "active"
            },
            {
                id: 3,
                title: "Tutorial: Advanced Commands",
                thumbnail: "https://via.placeholder.com/400x225?text=Video+Thumbnail",
                duration: "12:45",
                size: "156.7 MB",
                uploadedBy: "BotAdmin",
                uploadDate: "2024-01-13",
                views: 2341,
                status: "featured"
            },
            {
                id: 4,
                title: "Server Highlights",
                thumbnail: "https://via.placeholder.com/400x225?text=Video+Thumbnail",
                duration: "8:32",
                size: "98.1 MB",
                uploadedBy: "Moderator",
                uploadDate: "2024-01-12",
                views: 567,
                status: "processing"
            }
        ];

        this.renderVideos(videos);
    }

    renderVideos(videos) {
        const container = document.getElementById('videos-grid');
        if (!container) return;

        container.innerHTML = videos.map(video => `
            <div class="video-card">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div class="video-overlay">
                        <button class="play-button">
                            <i data-lucide="play"></i>
                        </button>
                    </div>
                    <div class="video-duration">${video.duration}</div>
                    <div class="video-status ${video.status}">${video.status}</div>
                </div>
                <div class="video-content">
                    <div class="video-header">
                        <h3 class="video-title">${video.title}</h3>
                        <button class="video-menu">
                            <i data-lucide="more-horizontal"></i>
                        </button>
                    </div>
                    <div class="video-meta">
                        <span>by ${video.uploadedBy}</span>
                        <span>${video.size}</span>
                    </div>
                    <div class="video-info">
                        <div class="video-info-item">
                            <i data-lucide="calendar"></i>
                            <span>${video.uploadDate}</span>
                        </div>
                        <div class="video-info-item">
                            <i data-lucide="eye"></i>
                            <span>${video.views}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.initializeLucideIcons();
    }

    loadUsersData() {
        const users = [
            {
                id: 1,
                username: "User123",
                displayName: "John Doe",
                avatar: "U1",
                status: "online",
                joinDate: "2023-05-15",
                messages: 1247,
                warnings: 0,
                role: "Member"
            },
            {
                id: 2,
                username: "GamerPro",
                displayName: "Jane Smith",
                avatar: "GP",
                status: "offline",
                joinDate: "2023-03-22",
                messages: 856,
                warnings: 1,
                role: "VIP"
            },
            {
                id: 3,
                username: "Moderator",
                displayName: "Mike Johnson",
                avatar: "MJ",
                status: "online",
                joinDate: "2022-11-08",
                messages: 3421,
                warnings: 0,
                role: "Moderator"
            },
            {
                id: 4,
                username: "BotAdmin",
                displayName: "Sarah Wilson",
                avatar: "SW",
                status: "online",
                joinDate: "2022-08-15",
                messages: 5632,
                warnings: 0,
                role: "Admin"
            },
            {
                id: 5,
                username: "NewUser",
                displayName: "Alex Brown",
                avatar: "AB",
                status: "offline",
                joinDate: "2024-01-10",
                messages: 23,
                warnings: 0,
                role: "Member"
            },
            {
                id: 6,
                username: "ProGamer",
                displayName: "Chris Lee",
                avatar: "CL",
                status: "online",
                joinDate: "2023-07-30",
                messages: 2156,
                warnings: 2,
                role: "VIP"
            }
        ];

        this.renderUsers(users);
    }

    renderUsers(users) {
        const container = document.getElementById('users-grid');
        if (!container) return;

        container.innerHTML = users.map(user => `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-header">
                    <div class="user-avatar">${user.avatar}</div>
                    <div class="user-info">
                        <h3>${user.displayName}</h3>
                        <p>@${user.username}</p>
                    </div>
                    <div class="user-status ${user.status}">${user.status}</div>
                </div>
                <div class="user-stats">
                    <div class="user-stat">
                        <div class="user-stat-value">${user.messages}</div>
                        <div class="user-stat-label">Messages</div>
                    </div>
                    <div class="user-stat">
                        <div class="user-stat-value">${user.warnings}</div>
                        <div class="user-stat-label">Warnings</div>
                    </div>
                    <div class="user-stat">
                        <div class="user-stat-value">${user.role}</div>
                        <div class="user-stat-label">Role</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadCommandsData() {
        const commands = [
            {
                id: 1,
                name: "/ban",
                description: "Ban a user from the server",
                category: "Moderation",
                permissions: "MODERATE_MEMBERS",
                usage: 1247,
                status: "active"
            },
            {
                id: 2,
                name: "/kick",
                description: "Kick a user from the server",
                category: "Moderation",
                permissions: "MODERATE_MEMBERS",
                usage: 856,
                status: "active"
            },
            {
                id: 3,
                name: "/music",
                description: "Play music in voice channels",
                category: "Entertainment",
                permissions: "CONNECT",
                usage: 3421,
                status: "active"
            },
            {
                id: 4,
                name: "/weather",
                description: "Get weather information",
                category: "Utility",
                permissions: "SEND_MESSAGES",
                usage: 234,
                status: "disabled"
            },
            {
                id: 5,
                name: "/poll",
                description: "Create a poll with reactions",
                category: "Utility",
                permissions: "SEND_MESSAGES",
                usage: 567,
                status: "active"
            },
            {
                id: 6,
                name: "/role",
                description: "Manage user roles",
                category: "Moderation",
                permissions: "MANAGE_ROLES",
                usage: 123,
                status: "active"
            },
            {
                id: 7,
                name: "/help",
                description: "Show command help information",
                category: "General",
                permissions: "SEND_MESSAGES",
                usage: 2341,
                status: "active"
            },
            {
                id: 8,
                name: "/stats",
                description: "Display server statistics",
                category: "Utility",
                permissions: "SEND_MESSAGES",
                usage: 445,
                status: "active"
            }
        ];

        this.renderCommands(commands);
    }

    renderCommands(commands) {
        const container = document.getElementById('commands-list');
        if (!container) return;

        container.innerHTML = commands.map(command => `
            <div class="command-card">
                <div class="command-header">
                    <div class="command-info">
                        <h3>${command.name}</h3>
                        <p>${command.description}</p>
                    </div>
                    <div class="command-actions">
                        <button class="btn-ghost">
                            <i data-lucide="edit"></i>
                        </button>
                        <button class="btn-ghost">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
                <div class="command-details">
                    <div class="command-detail">
                        <span class="command-detail-label">Category</span>
                        <span class="command-detail-value">${command.category}</span>
                    </div>
                    <div class="command-detail">
                        <span class="command-detail-label">Permissions</span>
                        <span class="command-detail-value">${command.permissions}</span>
                    </div>
                    <div class="command-detail">
                        <span class="command-detail-label">Usage Count</span>
                        <span class="command-detail-value">${command.usage}</span>
                    </div>
                    <div class="command-detail">
                        <span class="command-detail-label">Status</span>
                        <span class="command-detail-value ${command.status}">${command.status}</span>
                    </div>
                </div>
            </div>
        `).join('');

        this.initializeLucideIcons();
    }

    loadMessengerData() {
        const conversations = [
            {
                id: 1,
                username: "User123",
                displayName: "John Doe",
                avatar: "U1",
                lastMessage: "Thanks for the help with the command!",
                timestamp: "2 min ago",
                unread: 0
            },
            {
                id: 2,
                username: "GamerPro",
                displayName: "Jane Smith",
                avatar: "GP",
                lastMessage: "When will the new features be available?",
                timestamp: "5 min ago",
                unread: 2
            },
            {
                id: 3,
                username: "NewUser",
                displayName: "Alex Brown",
                avatar: "AB",
                lastMessage: "I'm having trouble with the music bot",
                timestamp: "1 hour ago",
                unread: 1
            }
        ];

        this.renderConversations(conversations);
        this.loadChatMessages();
    }

    renderConversations(conversations) {
        const container = document.getElementById('conversation-list');
        if (!container) return;

        container.innerHTML = conversations.map((conv, index) => `
            <div class="conversation-item ${index === 0 ? 'active' : ''}" data-user-id="${conv.id}">
                <div class="conversation-header">
                    <span class="conversation-name">${conv.displayName}</span>
                    <span class="conversation-time">${conv.timestamp}</span>
                </div>
                <div class="conversation-preview">${conv.lastMessage}</div>
            </div>
        `).join('');

        // Add click listeners for conversations
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.conversation-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.loadChatMessages();
            });
        });
    }

    loadChatMessages() {
        const messages = [
            {
                id: 1,
                sender: "User123",
                avatar: "U1",
                content: "Hi! I need help with setting up the music bot",
                timestamp: "10:30 AM",
                isOwn: false
            },
            {
                id: 2,
                sender: "Admin",
                avatar: "AD",
                content: "Sure! I can help you with that. What specific issue are you having?",
                timestamp: "10:32 AM",
                isOwn: true
            },
            {
                id: 3,
                sender: "User123",
                avatar: "U1",
                content: "The bot joins the voice channel but doesn't play any music when I use the /play command",
                timestamp: "10:33 AM",
                isOwn: false
            },
            {
                id: 4,
                sender: "Admin",
                avatar: "AD",
                content: "That might be a permissions issue. Make sure the bot has the 'Connect' and 'Speak' permissions in the voice channel.",
                timestamp: "10:35 AM",
                isOwn: true
            },
            {
                id: 5,
                sender: "User123",
                avatar: "U1",
                content: "Thanks for the help with the command!",
                timestamp: "10:40 AM",
                isOwn: false
            }
        ];

        this.renderChatMessages(messages);
    }

    renderChatMessages(messages) {
        const container = document.getElementById('chat-messages');
        if (!container) return;

        container.innerHTML = messages.map(message => `
            <div class="message ${message.isOwn ? 'own' : ''}">
                <div class="message-avatar">${message.avatar}</div>
                <div class="message-content">
                    ${message.content}
                    <div class="message-time">${message.timestamp}</div>
                </div>
            </div>
        `).join('');

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    setupSearchInputs() {
        // Video search
        const videoSearch = document.getElementById('video-search');
        if (videoSearch) {
            videoSearch.addEventListener('input', (e) => {
                this.filterVideos(e.target.value);
            });
        }

        // User search
        const userSearch = document.getElementById('user-search');
        if (userSearch) {
            userSearch.addEventListener('input', (e) => {
                this.filterUsers(e.target.value);
            });
        }

        // Command search
        const commandSearch = document.getElementById('command-search');
        if (commandSearch) {
            commandSearch.addEventListener('input', (e) => {
                this.filterCommands(e.target.value);
            });
        }
    }

    filterVideos(searchTerm) {
        const videoCards = document.querySelectorAll('.video-card');
        videoCards.forEach(card => {
            const title = card.querySelector('.video-title').textContent.toLowerCase();
            const uploader = card.querySelector('.video-meta span').textContent.toLowerCase();
            
            if (title.includes(searchTerm.toLowerCase()) || uploader.includes(searchTerm.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterUsers(searchTerm) {
        const userCards = document.querySelectorAll('.user-card');
        userCards.forEach(card => {
            const displayName = card.querySelector('.user-info h3').textContent.toLowerCase();
            const username = card.querySelector('.user-info p').textContent.toLowerCase();
            
            if (displayName.includes(searchTerm.toLowerCase()) || username.includes(searchTerm.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterCommands(searchTerm) {
        const commandCards = document.querySelectorAll('.command-card');
        commandCards.forEach(card => {
            const name = card.querySelector('.command-info h3').textContent.toLowerCase();
            const description = card.querySelector('.command-info p').textContent.toLowerCase();
            
            if (name.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    setupChatInput() {
        const messageInput = document.getElementById('message-input');
        const sendButton = document.querySelector('.send-btn');

        if (messageInput && sendButton) {
            const sendMessage = () => {
                const message = messageInput.value.trim();
                if (message) {
                    this.addMessage(message);
                    messageInput.value = '';
                }
            };

            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    addMessage(content) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'message own';
        messageElement.innerHTML = `
            <div class="message-avatar">AD</div>
            <div class="message-content">
                ${content}
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate bot response after a delay
        setTimeout(() => {
            this.addBotResponse();
        }, 1000 + Math.random() * 2000);
    }

    addBotResponse() {
        const responses = [
            "Thanks for your message! I'll look into that.",
            "Got it! Let me check on that for you.",
            "I understand. I'll get back to you shortly.",
            "Noted! I'll make sure to follow up on this.",
            "Thank you for reaching out. I'll handle this request."
        ];

        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <div class="message-avatar">U1</div>
            <div class="message-content">
                ${responses[Math.floor(Math.random() * responses.length)]}
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    setupUserCardClicks() {
        document.addEventListener('click', (e) => {
            const userCard = e.target.closest('.user-card');
            if (userCard) {
                const userId = userCard.dataset.userId;
                this.showUserProfile(userId);
            }
        });
    }

    showUserProfile(userId) {
        // Simple alert for now - in a real app, this would open a modal or navigate to a profile page
        alert(`Opening profile for user ID: ${userId}`);
    }

    updateNavigation() {
        // Update URL hash without page reload
        window.location.hash = this.currentPage;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DiscordBotAdmin();
});

// Handle browser back/forward buttons
window.addEventListener('hashchange', () => {
    const page = window.location.hash.slice(1) || 'dashboard';
    if (window.botAdmin) {
        window.botAdmin.navigateTo(page);
    }
});

// Handle responsive sidebar for mobile
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.add('mobile');
    } else {
        sidebar.classList.remove('mobile', 'open');
    }
});

// Initialize on window load as backup
window.addEventListener('load', () => {
    if (!window.botAdmin) {
        window.botAdmin = new DiscordBotAdmin();
    }
});