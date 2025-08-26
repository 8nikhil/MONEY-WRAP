// MONEYWARP Professional Investment Dashboard - JavaScript

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupModals();
    setupBrokerCards();
    setupStockCards();
    updateMarketData();
    setupNewsCards();
    setupRealTimeClock();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const target = this.getAttribute('href').substring(1);
            const section = document.getElementById(target);
            
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Modal Setup
function setupModals() {
    // Investment Modal
    const investmentCard = document.getElementById('investment-card');
    const investmentModal = document.getElementById('investment-modal');
    const closeInvestmentModal = document.getElementById('close-investment-modal');
    
    if (investmentCard && investmentModal) {
        investmentCard.addEventListener('click', function() {
            investmentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeInvestmentModal && investmentModal) {
        closeInvestmentModal.addEventListener('click', function() {
            investmentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Profit Modal
    const profitCard = document.getElementById('profit-card');
    const profitModal = document.getElementById('profit-modal');
    const closeProfitModal = document.getElementById('close-profit-modal');
    
    if (profitCard && profitModal) {
        profitCard.addEventListener('click', function() {
            profitModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeProfitModal && profitModal) {
        closeProfitModal.addEventListener('click', function() {
            profitModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modals when clicking overlay
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modals on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
}

// Broker Cards Setup
function setupBrokerCards() {
    const brokerCards = document.querySelectorAll('.broker-card');
    
    brokerCards.forEach(card => {
        card.addEventListener('click', function() {
            const brokerName = this.querySelector('.broker-name').textContent;
            const connectionStatus = this.querySelector('.connection-status span').textContent;
            
            if (connectionStatus === 'Connected') {
                showToast(`Opening ${brokerName} portfolio...`, 'success');
                // Simulate navigation to broker portfolio
                setTimeout(() => {
                    showToast(`${brokerName} portfolio loaded successfully!`, 'success');
                }, 1500);
            } else {
                showToast(`Connecting to ${brokerName}...`, 'info');
                // Simulate connection process
                setTimeout(() => {
                    const statusIndicator = this.querySelector('.status-indicator');
                    const statusText = this.querySelector('.connection-status span');
                    
                    statusIndicator.classList.remove('disconnected');
                    statusIndicator.classList.add('connected');
                    statusText.textContent = 'Connected';
                    
                    showToast(`${brokerName} connected successfully!`, 'success');
                }, 2000);
            }
        });
    });
}

// Stock Cards Setup
function setupStockCards() {
    const stockCards = document.querySelectorAll('.stock-detailed-card');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const stockCard = this.closest('.stock-detailed-card');
            const stockName = stockCard.querySelector('h4').textContent;
            
            showToast(`Loading detailed analysis for ${stockName}...`, 'info');
            
            // Simulate loading company details
            setTimeout(() => {
                showCompanyDetailsModal(stockName);
            }, 1000);
        });
    });
}

// Show Company Details Modal
function showCompanyDetailsModal(stockName) {
    const modalHTML = `
        <div class="modal-overlay" id="company-details-modal" style="display: flex;">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3 class="modal-title">${stockName} - Company Details</h3>
                    <button class="modal-close" onclick="closeModal('company-details-modal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="professional-grid cols-2">
                        <div class="professional-card">
                            <div class="professional-card-content">
                                <h4 class="subsection-title">Company Overview</h4>
                                <p>Leading company in its sector with strong fundamentals and growth prospects. Established market position with diversified revenue streams.</p>
                                
                                <h5 style="margin-top: 1rem; color: rgba(255,255,255,0.9);">Key Metrics</h5>
                                <div class="stats-grid">
                                    <div class="stat-item">
                                        <span class="stat-label">Market Cap</span>
                                        <span class="stat-value">₹15.2L Cr</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">P/E Ratio</span>
                                        <span class="stat-value">24.5</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Dividend Yield</span>
                                        <span class="stat-value">0.8%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="professional-card">
                            <div class="professional-card-content">
                                <h4 class="subsection-title">Recent Performance</h4>
                                <div class="stats-grid">
                                    <div class="stat-item">
                                        <span class="stat-label">1 Month</span>
                                        <span class="stat-value positive">+8.5%</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">3 Months</span>
                                        <span class="stat-value positive">+15.2%</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">1 Year</span>
                                        <span class="stat-value positive">+32.8%</span>
                                    </div>
                                </div>
                                
                                <h5 style="margin-top: 1rem; color: rgba(255,255,255,0.9);">Analyst Rating</h5>
                                <div style="color: #10b981; font-weight: 600; font-size: 1.1rem;">BUY</div>
                                <p style="font-size: 0.875rem; color: rgba(255,255,255,0.7); margin-top: 0.5rem;">
                                    Target Price: ₹3,200 (Upside: 12.3%)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Close Modal Function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Market Data Update
function updateMarketData() {
    const indices = [
        { name: 'NIFTY 50', value: 19875.30, change: 1.25 },
        { name: 'SENSEX', value: 66527.67, change: 1.18 },
        { name: 'BANK NIFTY', value: 43246.15, change: -0.85 },
        { name: 'NIFTY IT', value: 32145.80, change: 2.15 }
    ];
    
    // Simulate real-time updates
    setInterval(() => {
        indices.forEach((index, i) => {
            const change = (Math.random() - 0.5) * 0.5; // Random change between -0.25% and +0.25%
            index.value += (index.value * change / 100);
            index.change += change;
            
            const indexCard = document.querySelectorAll('.index-card')[i];
            if (indexCard) {
                const valueElement = indexCard.querySelector('.index-value');
                const changeElement = indexCard.querySelector('.index-change');
                
                if (valueElement) {
                    valueElement.textContent = index.value.toFixed(2);
                }
                
                if (changeElement) {
                    changeElement.textContent = `${index.change > 0 ? '+' : ''}${index.change.toFixed(2)}%`;
                    changeElement.className = `index-change ${index.change > 0 ? 'positive' : 'negative'}`;
                }
            }
        });
    }, 5000); // Update every 5 seconds
}

// News Cards Setup
function setupNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const newsCard = this.closest('.news-card');
            const newsTitle = newsCard.querySelector('.news-title').textContent;
            
            showNewsModal(newsTitle);
        });
    });
    
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            const newsTitle = this.querySelector('.news-title').textContent;
            showNewsModal(newsTitle);
        });
    });
}

// Show News Modal
function showNewsModal(title) {
    const newsContent = {
        "Sensex hits new record high as IT stocks surge": {
            content: "Indian benchmark indices reached fresh peaks during today's trading session, with the BSE Sensex crossing the 66,500 mark and the NSE Nifty 50 approaching 19,900. The rally was primarily driven by strong performance in IT and pharmaceutical sectors. Major gainers included TCS, Infosys, HCL Tech, and Dr. Reddy's Labs. Market experts attribute the surge to positive global cues and strong quarterly earnings reports from major IT companies.",
            category: "Market Update",
            time: "2 hours ago"
        },
        "Reliance announces Q3 results, beats estimates": {
            content: "Reliance Industries Limited reported stronger-than-expected quarterly earnings for Q3 FY24, with consolidated revenue growing 15.2% year-on-year to ₹2.35 lakh crore. The company's petrochemicals and oil refining businesses showed robust performance, while the digital services segment continued its growth trajectory. Retail segment revenues grew 19% YoY, reflecting strong consumer demand across categories.",
            category: "Corporate Earnings",
            time: "4 hours ago"
        },
        "RBI maintains repo rate at 6.5%": {
            content: "The Reserve Bank of India's Monetary Policy Committee decided to keep the benchmark repo rate unchanged at 6.50% in its latest bi-monthly review. The central bank maintained its stance of 'withdrawal of accommodation' while emphasizing the need to remain vigilant about inflation trends. The decision was unanimous among all MPC members, citing concerns about global economic uncertainties and domestic price pressures.",
            category: "Monetary Policy",
            time: "1 day ago"
        }
    };
    
    const article = newsContent[title] || {
        content: "Full article content will be loaded here. This is a placeholder for the detailed news article that would typically be fetched from a news API or content management system.",
        category: "Market News",
        time: "Recently"
    };
    
    const modalHTML = `
        <div class="modal-overlay" id="news-modal" style="display: flex;">
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="closeModal('news-modal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="news-meta" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <span style="color: #3b82f6; font-weight: 600;">${article.category}</span>
                        <span>${article.time}</span>
                    </div>
                    <div style="line-height: 1.8; color: rgba(255,255,255,0.9);">
                        ${article.content}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Real-time Clock
function setupRealTimeClock() {
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Update time in header if element exists
        let timeElement = document.querySelector('.current-time');
        if (!timeElement) {
            // Create time element in tagline
            const tagline = document.querySelector('.tagline');
            if (tagline) {
                tagline.innerHTML = `Professional Investment Dashboard • ${timeString}`;
            }
        } else {
            timeElement.textContent = timeString;
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        font-size: 14px;
        max-width: 300px;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }
    }, 3000);
}

function getToastColor(type) {
    const colors = {
        'success': 'rgba(16, 185, 129, 0.9)',
        'error': 'rgba(239, 68, 68, 0.9)',
        'warning': 'rgba(245, 158, 11, 0.9)',
        'info': 'rgba(59, 130, 246, 0.9)'
    };
    return colors[type] || colors.info;
}

// Add CSS animations for toast
const toastStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Portfolio Data Animation
function animatePortfolioValues() {
    const valueElements = document.querySelectorAll('.data-metric-value');
    
    valueElements.forEach(element => {
        const originalValue = element.textContent;
        
        // Simulate value updates (for demo purposes)
        setInterval(() => {
            if (originalValue.includes('₹')) {
                const numValue = parseFloat(originalValue.replace(/[₹,]/g, ''));
                const change = (Math.random() - 0.5) * 0.02; // ±1% change
                const newValue = numValue * (1 + change);
                
                if (originalValue.includes('L') || originalValue.includes('Cr')) {
                    element.textContent = originalValue; // Keep original for display
                } else {
                    element.textContent = `₹${newValue.toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })}`;
                }
            }
        }, 10000); // Update every 10 seconds
    });
}

// Smooth Scroll for Navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations and additional features
document.addEventListener('DOMContentLoaded', function() {
    animatePortfolioValues();
    setupSmoothScroll();
    
    // Add loading state simulation for demo
    setTimeout(() => {
        showToast('MONEYWARP Dashboard loaded successfully!', 'success');
    }, 1000);
});

// Handle window resize for responsive features
window.addEventListener('resize', function() {
    // Close any open modals on mobile orientation change
    if (window.innerWidth < 768) {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
        document.body.style.overflow = 'auto';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + I for Investment Modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        document.getElementById('investment-card')?.click();
    }
    
    // Ctrl/Cmd + P for Profit Modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        document.getElementById('profit-card')?.click();
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline capabilities
        console.log('MONEYWARP Dashboard ready for offline use');
    });
}