const welcomePage = document.getElementById("welcomePage");
const loginPage = document.getElementById("loginPage");
const choicePage = document.getElementById("choicePage");
const roleChoicePage = document.getElementById("roleChoicePage");
const planChoicePage = document.getElementById("planChoicePage");
const getStartedBtn = document.getElementById("getStartedBtn");
const soloChoice = document.getElementById("soloChoice");
const groupChoice = document.getElementById("groupChoice");
const adminChoice = document.getElementById("adminChoice");
const employeeChoice = document.getElementById("employeeChoice");
const loginContainer = document.getElementById("loginContainer");
const toggleBtn = document.getElementById("toggleBtn");
const overlayText = document.getElementById("overlayText");
const overlayDesc = document.getElementById("overlayDesc");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const appContainer = document.getElementById("appContainer");
const groupCodeInput = document.getElementById("groupCodeInput");
const submitCodeBtn = document.getElementById("submitCodeBtn");
const groupCodePopup = document.getElementById("groupCodePopup");
const groupCodeDisplay = document.getElementById("groupCodeDisplay");
const codeEntryPopup = document.getElementById("codeEntryPopup");
const sortSelect = document.getElementById('sortSelect');
const projectContainer = document.getElementById("projectContainer");
const noProjectsMsg = document.getElementById("noProjectsMsg");
const projectPopup = document.getElementById("projectPopup");
const deletePopup = document.getElementById("deletePopup");
const projectNameInput = document.getElementById("projectNameInput");
const profileLink = document.getElementById('profileLink');
const profileView = document.getElementById('profileView');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileDateJoined = document.getElementById('profileDateJoined');
const profileBio = document.getElementById('profileBio');
const profileLogoutBtn = document.getElementById('profileLogoutBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const notificationToggle = document.getElementById('notificationToggle');
const privacyToggle = document.getElementById('privacyToggle');
const dashboardTopbar = document.getElementById('dashboardTopbar');
const fabButton = document.getElementById('fabButton');
const changePictureBtn = document.getElementById('changePictureBtn');
const profileUpload = document.getElementById('profileUpload');
const projectDetailsPopup = document.getElementById('projectDetailsPopup');
const projectDetailsTitle = document.getElementById('projectDetailsTitle');
const saveProjectDetailsBtn = document.getElementById('saveProjectDetailsBtn');
const cancelProjectDetailsBtn = document.getElementById('cancelProjectDetailsBtn');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const sidebar = document.querySelector('.sidebar');
const myGroupView = document.getElementById('myGroupView');
const myGroupLink = document.getElementById('myGroupLink');
const feedbackLink = document.getElementById('feedbackLink');
const feedbackPopup = document.getElementById('feedbackPopup');
const feedbackInput = document.getElementById('feedbackInput');
const sendFeedbackBtn = document.getElementById('sendFeedbackBtn');
const feedbackNotification = document.getElementById('feedbackNotification');

let currentProjectCard = null;
let selectedProject = null;
let userType = null;
let userRole = null; // Add this new variable to track admin/employee role
let currentPlan = null;
let currentDate = new Date();

window.addEventListener('DOMContentLoaded', function() {
    loginPage.style.display = "none";
    choicePage.style.display = "none";
    roleChoicePage.style.display = "none";
    planChoicePage.style.display = "none";
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
});

getStartedBtn.addEventListener("click", () => {
    welcomePage.classList.add("hide");

    setTimeout(() => {
        welcomePage.style.display = "none";
        loginPage.style.display = "flex";
        loginPage.style.opacity = "0";
        loginPage.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            loginPage.style.opacity = "1";
            loginPage.style.transform = "translateY(0)";
        }, 50);
    }, 450);  
});

toggleBtn.addEventListener("click", () => {
    loginContainer.classList.toggle("active");
    if (loginContainer.classList.contains("active")) {
        overlayText.innerText = "Hello, Welcome to OnPoint!";
        overlayDesc.innerText = "Already have an account?";
        toggleBtn.innerText = "Login";
    } else {
        overlayText.innerText = "Welcome back to OnPoint";
        overlayDesc.innerText = "Don't have an account?";
        toggleBtn.innerText = "Register";
    }
});

// --- LocalStorage Register/Login Logic ---

function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts') || '[]');
}

function saveAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Register
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if (username === "" || email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    let accounts = getAccounts();
    if (accounts.some(acc => acc.username === username)) {
        alert("Username already exists!");
        return;
    }
    if (accounts.some(acc => acc.email === email)) {
        alert("Email already exists!");
        return;
    }

    accounts.push({ username, email, password });
    saveAccounts(accounts);

    alert("Registration successful! Please log in.");

    // Show login form after registration
    loginContainer.classList.remove("active");
    
    // Clear the registration form
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
});

// Login
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (username === "" || password === "") {
        alert("Please enter both username and password");
        return;
    }

    let accounts = getAccounts();
    const user = accounts.find(acc => acc.username === username && acc.password === password);

    if (!user) {
        alert("Invalid username or password!");
        return;
    }

    // Optionally, save current user info in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Continue to next page
    loginPage.classList.add("hide");
    setTimeout(() => {
        loginPage.style.display = "none";
        choicePage.style.display = "flex";
        choicePage.style.opacity = "0";
        choicePage.style.transform = "translateY(20px)";
        setTimeout(() => {
            choicePage.style.opacity = "1";
            choicePage.style.transform = "translateY(0)";
            choicePage.classList.add("show");
        }, 50);
    }, 450);
});

registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    
    if (username === "" || email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    loginPage.classList.add("hide");

    setTimeout(() => {
        loginPage.style.display = "none";
        choicePage.style.display = "flex";
        choicePage.style.opacity = "0";
        choicePage.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            choicePage.style.opacity = "1";
            choicePage.style.transform = "translateY(0)";
            choicePage.classList.add("show");
        }, 50);
    }, 450);
});

soloChoice.addEventListener("click", () => {
    userType = 'solo';
    updateSidebar();
    
    choicePage.classList.remove("show");
    choicePage.style.opacity = "0";
    choicePage.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        choicePage.style.display = "none";
        appContainer.style.display = "flex";
        appContainer.style.opacity = "0";
        appContainer.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            appContainer.style.opacity = "1";
            appContainer.style.transform = "translateY(0)";
            appContainer.classList.add("show");
        }, 50);
    }, 450);
});

groupChoice.addEventListener("click", () => {
    choicePage.classList.remove("show");
    choicePage.style.opacity = "0";
    choicePage.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        choicePage.style.display = "none";
        roleChoicePage.style.display = "flex";
        roleChoicePage.style.opacity = "0";
        roleChoicePage.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            roleChoicePage.style.opacity = "1";
            roleChoicePage.style.transform = "translateY(0)";
            roleChoicePage.classList.add("show");
        }, 50);
    }, 450);
});

adminChoice.addEventListener("click", () => {
    roleChoicePage.classList.remove("show");
    roleChoicePage.style.opacity = "0";
    roleChoicePage.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        roleChoicePage.style.display = "none";
        planChoicePage.style.display = "flex";
        planChoicePage.style.opacity = "0";
        planChoicePage.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            planChoicePage.style.opacity = "1";
            planChoicePage.style.transform = "translateY(0)";
            planChoicePage.classList.add("show");
        }, 50);
    }, 450);
});

employeeChoice.addEventListener("click", () => {
    userRole = 'employee'; // Set role as employee
    showCodeEntryPopup();
});

function showCodeEntryPopup() {
    groupCodeInput.value = "";
    codeEntryPopup.classList.add("show");
}

function closeCodeEntryPopup() {
    codeEntryPopup.classList.remove("show");
}

submitCodeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const code = groupCodeInput.value.trim();
    
    if (code.length !== 7) {
        alert("Please enter a valid 7-digit code");
        return;
    }

    userType = 'group';
    // userRole is already set to 'employee' from employeeChoice click
    updateSidebar();
    
    closeCodeEntryPopup();
    roleChoicePage.classList.remove("show");
    roleChoicePage.style.opacity = "0";
    roleChoicePage.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        roleChoicePage.style.display = "none";
        appContainer.style.display = "flex";
        appContainer.style.opacity = "0";
        appContainer.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            appContainer.style.opacity = "1";
            appContainer.style.transform = "translateY(0)";
            appContainer.classList.add("show");
        }, 50);
    }, 450);
});

document.querySelectorAll('.choose-plan-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        currentPlan = this.parentElement.getAttribute('data-plan');
        userType = 'group';
        userRole = 'admin'; // Set role as admin for plan choosers
        updateSidebar();
        
        planChoicePage.classList.remove("show");
        planChoicePage.style.opacity = "0";
        planChoicePage.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            planChoicePage.style.display = "none";
            appContainer.style.display = "flex";
            appContainer.style.opacity = "0";
            appContainer.style.transform = "translateY(20px)";
            
            setTimeout(() => {
                appContainer.style.opacity = "1";
                appContainer.style.transform = "translateY(0)";
                appContainer.classList.add("show");
                
                setTimeout(() => {
                    showGroupCodePopup();
                }, 2000);
            }, 50);
        }, 450);
    });
});

function showGroupCodePopup() {
    const code = generateRandomCode(7);
    groupCodeDisplay.textContent = code;
    groupCodePopup.classList.add("show");
}

function closeGroupCodePopup() {
    groupCodePopup.classList.remove("show");
}

function generateRandomCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function updateSidebar() {
    const dashboardLink = document.getElementById('dashboardLink');
    const calendarLink = document.getElementById('calendarLink');
    const tasksLink = document.getElementById('tasksLink');
    const myGroupLink = document.getElementById('myGroupLink');
    const upgradeLink = document.getElementById('upgradeLink');
    const profileLink = document.getElementById('profileLink');
    const helpLink = document.getElementById('helpLink');

    document.querySelectorAll('.sidebar a').forEach(link => {
        link.classList.remove('active');
    });
    
    if (userType === 'solo') {
        tasksLink.style.display = 'none';
        myGroupLink.style.display = 'none';
        upgradeLink.style.display = 'flex';
        profileLink.style.display = 'flex';
        fabButton.style.display = 'flex';
    } else if (userType === 'group') {
        tasksLink.style.display = 'none';
        myGroupLink.style.display = 'flex';
        upgradeLink.style.display = 'none';
        profileLink.style.display = 'flex';
        
        // Hide FAB for group employees, show for group admins
        if (userRole === 'employee') {
            fabButton.style.display = 'none';
        } else {
            fabButton.style.display = 'flex';
        }
    }
}

function showDashboard() {
    document.getElementById('dashboardView').style.display = 'block';
    document.getElementById('calendarView').style.display = 'none';
    document.getElementById('profileView').style.display = 'none';
    document.getElementById('contentTitle').textContent = 'My Projects';
    document.getElementById('dashboardLink').classList.add('active');
    document.getElementById('calendarLink').classList.remove('active');
    document.getElementById('profileLink').classList.remove('active');
    dashboardTopbar.style.display = 'flex';
    
    // Only show FAB if user has permission (not a group employee)
    if (userType === 'solo' || (userType === 'group' && userRole === 'admin')) {
        fabButton.style.display = 'flex';
    } else {
        fabButton.style.display = 'none';
    }
}

function showCalendar() {
    document.getElementById('dashboardView').style.display = 'none';
    document.getElementById('calendarView').style.display = 'block';
    document.getElementById('profileView').style.display = 'none';
    document.getElementById('contentTitle').textContent = 'Calendar';
    document.getElementById('dashboardLink').classList.remove('active');
    document.getElementById('calendarLink').classList.add('active');
    document.getElementById('profileLink').classList.remove('active');
    generateCalendar(currentDate);

    dashboardTopbar.style.display = 'none';
    fabButton.style.display = 'none';
}

function showProfile() {
    document.getElementById('dashboardView').style.display = 'none';
    document.getElementById('calendarView').style.display = 'none';
    document.getElementById('profileView').style.display = 'block';
    document.getElementById('contentTitle').textContent = 'Profile';
    document.getElementById('dashboardLink').classList.remove('active');
    document.getElementById('calendarLink').classList.remove('active');
    document.getElementById('profileLink').classList.add('active');
    dashboardTopbar.style.display = 'none';
    fabButton.style.display = 'none';

    const username = document.getElementById('loginUsername').value.trim() || 
                    document.getElementById('registerUsername').value.trim() || 
                    'User';
    profileName.textContent = username;
    profileEmail.textContent = username.toLowerCase() + '@gmail.com';
    profileDateJoined.textContent = new Date().toLocaleDateString();
}

function generateCalendar(date) {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthYear = document.getElementById('currentMonthYear');
    calendarDays.innerHTML = '';

    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    currentMonthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();

    const prevMonthDays = firstDay.getDay();
    const nextMonthDays = 6 - lastDay.getDay();

    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    for (let i = prevMonthDays - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('prev-month');
        dayElement.textContent = prevMonthLastDay - i;
        calendarDays.appendChild(dayElement);
    }

    const allTasks = getAllTasks();

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        const dateSpan = document.createElement('span');
        dateSpan.className = 'calendar-date';
        dateSpan.textContent = i;

        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        const dayTasks = allTasks.filter(task => {
            const taskDate = task.dueDate.split('T')[0];
            return taskDate === dateStr;
        });

        if (dayTasks.length > 0) {
            const taskCount = document.createElement('div');
            taskCount.className = 'task-count';
            taskCount.textContent = dayTasks.length;
            dateSpan.appendChild(taskCount);
        }

        dayElement.appendChild(dateSpan);

        if (isToday(new Date(date.getFullYear(), date.getMonth(), i))) {
            dayElement.classList.add('today');
        }

        dayElement.addEventListener('click', () => {
            showDayTasks(i, date.getMonth(), date.getFullYear(), dayTasks);
        });
        
        calendarDays.appendChild(dayElement);
    }

    for (let i = 1; i <= nextMonthDays; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('next-month');
        dayElement.textContent = i;
        calendarDays.appendChild(dayElement);
    }
}

function getAllTasks() {
    const allTasks = [];
    const projectCards = document.querySelectorAll('.card');
    
    projectCards.forEach(card => {
        const projectId = card.dataset.id;
        const projectName = card.querySelector('.project-title').textContent;
        
        if (projectId) {
            try {
                const tasks = JSON.parse(localStorage.getItem(projectId) || '[]');
                tasks.forEach(task => {
                    if (task.dueDate) {
                        allTasks.push({
                            ...task,
                            projectName: projectName
                        });
                    }
                });
            } catch (e) {
                console.error('Error parsing tasks:', e);
            }
        }
    });
    
    return allTasks;
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function showDayTasks(day, month, year, tasks) {
    const existingPopup = document.querySelector('.day-tasks-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement('div');
    popup.className = 'day-tasks-popup';

    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    
    const tasksHTML = tasks.length > 0 
        ? tasks.map(task => `
            <div class="day-task-item">
                <div>
                    <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
                    <div class="day-task-project">${task.projectName}</div>
                </div>
                <div class="day-task-time">${task.dueTime || ''}</div>
            </div>
        `).join('')
        : '<div style="text-align: center; padding: 20px;">No tasks for this day</div>';

    popup.innerHTML = `
        <div class="day-tasks-header">
            <h3>${monthNames[month]} ${day}, ${year}</h3>
            <button class="day-tasks-close">&times;</button>
        </div>
        <div class="day-tasks-list">
            ${tasksHTML}
        </div>
    `;

    document.body.appendChild(popup);

    const backdrop = document.createElement('div');
    backdrop.className = 'popup-backdrop';
    document.body.appendChild(backdrop);

    setTimeout(() => {
        popup.classList.add('show');
        backdrop.classList.add('show');
    }, 10);

    const closeBtn = popup.querySelector('.day-tasks-close');
    const closePopup = () => {
        popup.classList.remove('show');
        backdrop.classList.remove('show');
        setTimeout(() => {
            popup.remove();
            backdrop.remove();
        }, 300);
    };

    closeBtn.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);
}

document.getElementById('dashboardLink').addEventListener('click', (e) => {
    e.preventDefault();
    myGroupView.style.display = 'none';
    myGroupLink.classList.remove('active');
    showDashboard();
});

document.getElementById('calendarLink').addEventListener('click', (e) => {
    e.preventDefault();
    myGroupView.style.display = 'none';
    myGroupLink.classList.remove('active');
    showCalendar();
});

document.getElementById('profileLink').addEventListener('click', (e) => {
    e.preventDefault();
    myGroupView.style.display = 'none';
    myGroupLink.classList.remove('active');
    showProfile();
});

document.getElementById('myGroupLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.content-view').forEach(view => {
        view.style.display = 'none';
    });
    myGroupView.style.display = 'block';
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
});

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

profileLogoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    userType = null;
    userRole = null; // Reset role on logout
    currentPlan = null;
    
    appContainer.classList.remove("show");
    appContainer.style.opacity = "0";
    appContainer.style.transform = "translateY(20px)";

    setTimeout(() => {
        appContainer.style.display = "none";

        loginPage.style.display = "flex";
        loginPage.style.opacity = "0";
        loginPage.style.transform = "translateY(20px)";
        loginPage.classList.remove("hide");
        
        setTimeout(() => {
            loginPage.style.opacity = "1";
            loginPage.style.transform = "translateY(0)";
        }, 50);
    }, 450);
});

let initialTasks = [];

function showProjectPopup() {
    if (userType === 'solo') {
        const projectCount = document.querySelectorAll('.card').length;
        if (projectCount >= 2) {
            alert("Free plan is limited to 2 projects. Please upgrade to create more projects.");
            openModal();
            return;
        }
        document.querySelector('.task-section').style.display = 'block';
        document.querySelector('.image-upload-section').style.display = 'none';
    } else if (userType === 'group') {
        document.querySelector('.task-section').style.display = 'none';
        document.querySelector('.image-upload-section').style.display = 'block';
    }

    projectNameInput.value = "";
    initialTasks = [];
    document.getElementById('newTaskList').innerHTML = '';
    projectPopup.classList.add("show");

    sidebar.classList.add('disabled');
    fabButton.classList.add('disabled');
    fabButton.setAttribute('disabled', 'disabled');
}

// Add new function to handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        const preview = document.getElementById('imagePreview');
        const imageName = document.getElementById('imageName');
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            imageName.textContent = file.name;
        }
        
        reader.readAsDataURL(file);
    }
}

// Add event listener for image upload
document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function closeProjectPopup() {
    projectPopup.classList.remove("show");

    sidebar.classList.remove('disabled');
    fabButton.classList.remove('disabled');
    fabButton.removeAttribute('disabled');
}

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('subscriptionModal')) {
        closeModal();
    }
    if (e.target === deletePopup) {
        closeDeletePopup();
    }
    if (e.target === groupCodePopup) {
        closeGroupCodePopup();
    }
    if (e.target === codeEntryPopup) {
        closeCodeEntryPopup();
    }
});

window.addEventListener('keydown', function(e) {
    if (projectPopup.classList.contains('show') && e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
    }
});

document.getElementById('newTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('newTaskInput');
    const dateInput = document.getElementById('newTaskDate');
    const timeInput = document.getElementById('newTaskTime');
    
    if (initialTasks.length >= 5) {
        alert("Maximum of 5 tasks allowed!");
        return;
    }
    
    if (!taskInput.value.trim() || !dateInput.value || !timeInput.value) {
        alert("Please fill in all task fields (task name, date, and time)");
        return;
    }

    const selectedDateTime = new Date(`${dateInput.value}T${timeInput.value}`);
    const now = new Date();
    
    if (selectedDateTime < now) {
        alert("Task date and time cannot be in the past!");
        return;
    }
    
    addInitialTask(
        taskInput.value.trim(),
        dateInput.value,
        timeInput.value
    );
    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
});

function addInitialTask(text, date, time) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item new-task'; 
    
    const taskText = document.createElement('div');
    taskText.className = 'task-text';
    taskText.textContent = text;

    const taskDateTime = document.createElement('div');
    taskDateTime.className = 'task-datetime';
    if (date) {
        taskDateTime.textContent = `${date} ${time || ''}`;
    }
    
    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'task-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    
    deleteBtn.addEventListener('click', () => {
        const index = initialTasks.findIndex(t => t.text === text && t.dueDate === date);
        if (index > -1) {
            initialTasks.splice(index, 1);
        }
        taskItem.remove();
    });
    
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDateTime);
    taskItem.appendChild(deleteBtn);
    
    document.getElementById('newTaskList').appendChild(taskItem);
    
    initialTasks.push({
        text: text,
        completed: false,
        dueDate: date,
        dueTime: time,
        projectName: projectNameInput.value.trim()
    });
}

document.getElementById('saveProjectBtn').addEventListener('click', () => {
    const projectName = projectNameInput.value.trim();

    if (userType === 'group') {
        const imageUpload = document.getElementById('imageUpload');
        const projectDate = document.getElementById('projectDate');
        const projectTime = document.getElementById('projectTime');

        if (projectName === "") {
            alert("Please enter a project name.");
            return;
        }
        if (!imageUpload.files[0]) {
            alert("Please upload a file.");
            return;
        }
        if (!projectDate.value || !projectTime.value) {
            alert("Please select both date and time.");
            return;
        }

        // Check if date and time are not in the past
        const selectedDateTime = new Date(`${projectDate.value}T${projectTime.value}`);
        const now = new Date();
        if (selectedDateTime < now) {
            alert("Date and time cannot be in the past!");
            return;
        }

        // Create project card for group
        const projectId = generateProjectId();
        let project = document.createElement("div");
        project.classList.add("card");
        project.dataset.created = new Date().toISOString();
        project.dataset.id = projectId;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'project-title';
        titleDiv.textContent = projectName;
        project.appendChild(titleDiv);

        // Store file as Blob URL
        const file = imageUpload.files[0];
        const fileUrl = URL.createObjectURL(file);

        // Store project data
        const projectData = {
            name: projectName,
            date: projectDate.value,
            time: projectTime.value,
            fileUrl: fileUrl,
            fileName: file.name
        };
        localStorage.setItem(projectId, JSON.stringify(projectData));

        projectContainer.insertBefore(project, noProjectsMsg);
        noProjectsMsg.style.display = "none";
        closeProjectPopup();
        updateCalendarEvents(); // Update calendar after adding project
        return;
    } else {
        // Existing solo user logic
        if (projectName === "") {
            alert("Please enter a project name.");
            return;
        }

        const projectId = generateProjectId();
        let project = document.createElement("div");
        project.classList.add("card");
        project.dataset.created = new Date().toISOString();
        project.dataset.id = projectId;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'project-title';
        titleDiv.textContent = projectName;
        project.appendChild(titleDiv);

        const bucketLines = document.createElement('div');
        bucketLines.className = 'bucket-lines';
        project.appendChild(bucketLines);

        const bucketFill = document.createElement('div');
        bucketFill.className = 'bucket-fill';
        bucketFill.style.height = '0%';
        project.appendChild(bucketFill);

        const progressText = document.createElement('div');
        progressText.className = 'progress-text';
        progressText.textContent = '0%';
        project.appendChild(progressText);

        project.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            selectedProject = project;
            deletePopup.classList.add("show");
        });

        project.addEventListener("click", function() {
            currentProjectCard = project;
            projectDetailsTitle.textContent = projectName;
            loadTasks(project.dataset.id);
            projectDetailsPopup.classList.add('show');
        });

        projectContainer.insertBefore(project, noProjectsMsg);
        noProjectsMsg.style.display = "none";

        if (initialTasks.length > 0) {
            initialTasks = initialTasks.map(task => ({
                ...task,
                projectName: projectName
            }));
            localStorage.setItem(projectId, JSON.stringify(initialTasks));
        }

        closeProjectPopup();
        updateCalendarEvents();
    }
});

function closeProjectPopup() {
    projectPopup.classList.remove("show");

    sidebar.classList.remove('disabled');
    fabButton.classList.remove('disabled');
    fabButton.removeAttribute('disabled');
}

function deleteProject() {
    if (selectedProject) {

        localStorage.removeItem(selectedProject.dataset.id);
        projectContainer.removeChild(selectedProject);
        selectedProject = null;
        updateCalendarEvents();
    }
    closeDeletePopup();
    if (projectContainer.children.length === 1) { 
        noProjectsMsg.style.display = "block";
    }
}

function closeDeletePopup() {
    deletePopup.classList.remove("show");
}

function openModal() {
    document.getElementById("subscriptionModal").classList.add("show");
    document.querySelector('.plan-toggle-btn').style.display = 'none';
}

function closeModal() {
    document.getElementById("subscriptionModal").classList.remove("show");
}

darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', this.checked);
});

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('subscriptionModal')) {
        closeModal();
    }
    if (e.target === deletePopup) {
        closeDeletePopup();
    }
    if (e.target === groupCodePopup) {
        closeGroupCodePopup();
    }
    if (e.target === codeEntryPopup) {
        closeCodeEntryPopup();
    }
});

function addTaskToList(text, completed = false, projectId, dueDate = null, dueTime = null) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('div');
    checkbox.className = `task-checkbox${completed ? ' checked' : ''}`;
    
    const taskText = document.createElement('div');
    taskText.className = `task-text${completed ? ' completed' : ''}`;
    taskText.textContent = text;

    const taskDateTime = document.createElement('div');
    taskDateTime.className = 'task-datetime';
    if (dueDate) {
        taskDateTime.textContent = `${dueDate} ${dueTime || ''}`;
    }

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDateTime);

    checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('checked');
        taskText.classList.toggle('completed');
        saveTasks(projectId);
        updateProjectProgress(projectId);
    });
    
    taskList.appendChild(taskItem);
    updateCalendarEvents();
    updateProjectProgress(projectId);
}

function saveTasks(projectId) {
    const tasks = [];
    taskList.querySelectorAll('.task-item').forEach(item => {
        const dateTimeText = item.querySelector('.task-datetime').textContent;
        let [date] = dateTimeText.split(' ');
        
        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.querySelector('.task-checkbox').classList.contains('checked'),
            dueDate: date,
            dueTime: dateTimeText.split(' ')[1] || '',
            projectName: currentProjectCard.querySelector('.project-title').textContent
        });
    });
    
    localStorage.setItem(projectId, JSON.stringify(tasks));
    generateCalendar(currentDate); 
}

function updateProjectProgress(projectId) {
    const tasks = JSON.parse(localStorage.getItem(projectId) || '[]');
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    
    const projectCard = document.querySelector(`.card[data-id="${projectId}"]`);
    if (projectCard) {
        let progressText = projectCard.querySelector('.progress-text');
        let bucketFill = projectCard.querySelector('.bucket-fill');
        
        if (!progressText) {
            progressText = document.createElement('div');
            progressText.className = 'progress-text';
            bucketFill = document.createElement('div');
            bucketFill.className = 'bucket-fill';
            const bucketLines = document.createElement('div');
            bucketLines.className = 'bucket-lines';
            projectCard.appendChild(bucketLines);
            projectCard.appendChild(bucketFill);
            projectCard.appendChild(progressText);
        }
        
        bucketFill.style.height = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }
}

function updateCalendarEvents() {
    const allTasks = [];
    const projectIds = Array.from(document.querySelectorAll('.card')).map(card => card.dataset.id);
    
    projectIds.forEach(id => {
        if (id) {
            const tasks = JSON.parse(localStorage.getItem(id) || '[]');
            if (tasks.length > 0) {
                const projectName = document.querySelector(`.card[data-id="${id}"] .project-title`).textContent;
                const processedTasks = tasks.map(task => ({
                    ...task,
                    projectName: projectName
                }));
                allTasks.push(...processedTasks);
            }
        }
    });

    generateCalendar(currentDate, allTasks);
}

document.addEventListener('touchstart', function() {}, {passive: true});
sortSelect.addEventListener('change', sortProjects);

let lastTouchTime = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchTime <= 300) {
        event.preventDefault();
    }
    lastTouchTime = now;
}, {passive: false});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        setTimeout(() => {
            const rect = this.getBoundingClientRect();
            if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
                this.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }, 300);
    });
});

document.querySelectorAll('button, a').forEach(btn => {
    btn.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    });
    
    btn.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
    });
});

document.getElementById('upgradeLink').addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});
fabButton.addEventListener("click", showProjectPopup);

function sortProjects() {
    const projects = Array.from(document.querySelectorAll('.card'));
    const sortValue = sortSelect.value;
    
    projects.sort((a, b) => {
        if (sortValue === 'name-asc') {
            return a.textContent.localeCompare(b.textContent);
        } else if (sortValue === 'name-desc') {
            return b.textContent.localeCompare(a.textContent);
        } else if (sortValue === 'date-asc') {
            return new Date(a.dataset.created) - new Date(b.dataset.created);
        } else if (sortValue === 'date-desc') {
            return new Date(b.dataset.created) - new Date(a.dataset.created);
        }
        return 0;
    });

    projects.forEach(project => {
        projectContainer.insertBefore(project, noProjectsMsg);
    });
}

changePictureBtn.addEventListener('click', () => {
    profileUpload.click();
});

profileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('profileImg').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

projectContainer.addEventListener('click', function(e) {
    const projectCard = e.target.closest('.card');
    if (!projectCard) return;
    
    currentProjectCard = projectCard;
    projectDetailsTitle.textContent = projectCard.textContent;

    loadTasks(projectCard.dataset.id || generateProjectId());
    
    projectDetailsPopup.classList.add('show');
});

function generateProjectId() {
    return 'proj_' + Date.now();
}

// Update the loadTasks function to properly handle group project tasks
function loadTasks(projectId) {
    taskList.innerHTML = '';
    const projectData = JSON.parse(localStorage.getItem(projectId) || '{}');

    // GROUP EMPLOYEE: Assignment project
    if (userType === 'group' && userRole === 'employee' && projectId === 'assignment_project') {
        document.querySelector('#projectDetailsPopup .task-section').style.display = 'none';
        sidebar.classList.add('disabled');
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('disabled');
            card.style.pointerEvents = 'none';
        });

        // Remove previous file container if exists
        let fileContainer = document.querySelector('.project-file-container');
        if (fileContainer) fileContainer.remove();

        fileContainer = document.createElement('div');
        fileContainer.className = 'project-file-container';
        fileContainer.style.textAlign = 'center';
        fileContainer.style.margin = '20px 0';

        // --- Show Admin's Assignment File ---
        // If not already loaded, fetch assignment.pdf and store blob URL in localStorage
        if (!projectData.fileUrl || !projectData.fileName) {
            const pdfPath = 'assignment.pdf'; // Make sure this matches the exact filename and case
projectData.fileUrl = pdfPath;
projectData.fileName = 'assignment.pdf';
localStorage.setItem(projectId, JSON.stringify(projectData));
loadTasks(projectId);
            return;
        }

        // Show admin's assignment file
        fileContainer.innerHTML = `
            <div>
                <strong>Assignment File:</strong><br>
                <a href="${projectData.fileUrl}" download="${projectData.fileName}" class="image-action-btn" style="margin-bottom:10px;display:inline-block;">
                    <i class="fas fa-download"></i> Download Assignment
                </a>
                <a href="${projectData.fileUrl}" target="_blank" class="image-action-btn" style="margin-bottom:10px;display:inline-block;">
                    <i class="fas fa-external-link-alt"></i> Open in New Tab
                </a>
            </div>
            <div class="project-datetime">
                <strong>Due:</strong> ${projectData.date || ''} ${projectData.time || ''}
            </div>
            <hr style="margin:20px 0;">
        `;

        // --- Show Submission Section ---
        const submission = JSON.parse(localStorage.getItem('assignment_submission') || 'null');
        if (submission && submission.fileName) {
            fileContainer.innerHTML += `
                <div>
                    <strong>Your Submission:</strong><br>
                    <a href="${submission.fileUrl}" download="${submission.fileName}" class="image-action-btn" style="margin-bottom:10px;display:inline-block;">
                        <i class="fas fa-download"></i> Download Your File
                    </a>
                    <a href="${submission.fileUrl}" target="_blank" class="image-action-btn" style="margin-bottom:10px;display:inline-block;">
                        <i class="fas fa-external-link-alt"></i> Open in New Tab
                    </a>
                </div>
                <div class="project-datetime">
                    <strong>Submitted:</strong> ${submission.fileName}
                </div>
            `;
        } else {
            // Show file input and submit button
            fileContainer.innerHTML += `
                <div>
                    <input type="file" id="assignmentFileInput" accept=".pdf" style="margin-top:10px;">
                    <button id="submitAssignmentBtn" class="yes-btn" style="margin-top:10px;">Submit File</button>
                </div>
            `;
        }

        const popup = document.getElementById('projectDetailsPopup');
        popup.insertBefore(fileContainer, popup.querySelector('.popup-buttons'));

        // Add event listener for submit button if not yet submitted
        if (!submission || !submission.fileName) {
            setTimeout(() => {
                const submitBtn = document.getElementById('submitAssignmentBtn');
                const fileInput = document.getElementById('assignmentFileInput');
                if (submitBtn && fileInput) {
                    submitBtn.onclick = function() {
                        const file = fileInput.files[0];
                        if (!file) {
                            alert('Please select a file to submit.');
                            return;
                        }
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            localStorage.setItem('assignment_submission', JSON.stringify({
                                fileUrl: e.target.result,
                                fileName: file.name
                            }));
                            alert('Assignment submitted!');
                            loadTasks(projectId); // Refresh view
                        };
                        reader.readAsDataURL(file);
                    };
                }
            }, 100);
        }
        return;
    }

    // ...existing code for admin and solo...
    if (userType === 'group') {
        document.querySelector('#projectDetailsPopup .task-section').style.display = 'none';
        sidebar.classList.add('disabled');
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('disabled');
            card.style.pointerEvents = 'none';
        });
        // Remove previous file container if exists
        let fileContainer = document.querySelector('.project-file-container');
        if (fileContainer) fileContainer.remove();

        fileContainer = document.createElement('div');
        fileContainer.className = 'project-file-container';
        fileContainer.style.textAlign = 'center';
        fileContainer.style.margin = '20px 0';

        if (projectData.fileUrl && projectData.fileName) {
            fileContainer.innerHTML = `
                <div>
                    <a href="${projectData.fileUrl}" download="${projectData.fileName}" class="image-action-btn" style="margin-bottom:10px;display:inline-block;">
                        <i class="fas fa-download"></i> Download File
                    </a>
                    <a href="${projectData.fileUrl}" target="_blank" class="image-action-btn" style="margin-bottom:10px;display:inline-block;">
                        <i class="fas fa-external-link-alt"></i> Open in New Tab
                    </a>
                </div>
                <div class="project-datetime">
                    <strong>Date:</strong> ${projectData.date} <strong>Time:</strong> ${projectData.time}
                </div>
            `;
        } else {
            fileContainer.innerHTML = `<div>No file uploaded.</div>`;
        }

        // --- Add Submission Button for Admins ---
        if (userRole === 'admin') {
            const submissionBtn = document.createElement('button');
            submissionBtn.textContent = 'View Submissions';
            submissionBtn.className = 'yes-btn';
            submissionBtn.style.marginTop = '20px';
            submissionBtn.onclick = function() {
                showSubmissionPopup(projectId);
            };
            fileContainer.appendChild(submissionBtn);
        }

        const popup = document.getElementById('projectDetailsPopup');
        popup.insertBefore(fileContainer, popup.querySelector('.popup-buttons'));
        return;
    } else {
        // Solo user view - show task list but hide input section
        document.querySelector('#projectDetailsPopup .task-section').style.display = 'block';

        const tasks = Array.isArray(projectData) ? projectData : [];
        tasks.forEach(task => {
            addTaskToList(
                task.text,
                task.completed,
                projectId,
                task.dueDate || task.date,
                task.dueTime || task.time
            );
        });
    }

    currentProjectCard.dataset.id = projectId;
}

// Update the getAllTasks function to handle both solo and group projects
function getAllTasks() {
    const allTasks = [];
    const projectCards = document.querySelectorAll('.card');
    
    projectCards.forEach(card => {
        const projectId = card.dataset.id;
        const projectName = card.querySelector('.project-title').textContent;
        
        if (projectId) {
            try {
                const data = JSON.parse(localStorage.getItem(projectId) || '[]');
                if (Array.isArray(data)) {
                    // Solo project tasks
                    data.forEach(task => {
                        if (task.dueDate) {
                            allTasks.push({
                                ...task,
                                projectName: projectName
                            });
                        }
                    });
                } else if (data.date) {
                    // Group project task
                    allTasks.push({
                        text: data.name || 'Project Deadline',
                        completed: false,
                        dueDate: data.date,
                        dueTime: data.time,
                        projectName: projectName
                    });
                }
            } catch (e) {
                console.error('Error parsing tasks:', e);
            }
        }
    });
    
    return allTasks;
}

// Update the saveProjectBtn event listener for group projects
document.getElementById('saveProjectBtn').addEventListener('click', () => {
    const projectName = projectNameInput.value.trim();
    
    if (userType === 'group') {
        const imageUpload = document.getElementById('imageUpload');
        const projectDate = document.getElementById('projectDate');
        const projectTime = document.getElementById('projectTime');
        
        if (projectName === "") {
            alert("Please enter a project name.");
            return;
        }
        if (!imageUpload.files[0]) {
            alert("Please upload an image.");
            return;
        }
        if (!projectDate.value || !projectTime.value) {
            alert("Please select both date and time.");
            return;
        }

        // Check if date and time are not in the past
        const selectedDateTime = new Date(`${projectDate.value}T${projectTime.value}`);
        const now = new Date();
        if (selectedDateTime < now) {
            alert("Date and time cannot be in the past!");
            return;
        }

        // Create project card for group
        const projectId = generateProjectId();
        let project = document.createElement("div");
        project.classList.add("card");
        project.dataset.created = new Date().toISOString();
        project.dataset.id = projectId;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'project-title';
        titleDiv.textContent = projectName;
        project.appendChild(titleDiv);

        // Read the image file
        const reader = new FileReader();
        reader.onload = function(e) {
            // Store project data
            const projectData = {
                name: projectName,
                date: projectDate.value,
                time: projectTime.value,
                imageData: e.target.result
            };
            localStorage.setItem(projectId, JSON.stringify(projectData));
            
            projectContainer.insertBefore(project, noProjectsMsg);
            noProjectsMsg.style.display = "none";
            closeProjectPopup();
            updateCalendarEvents(); // Update calendar after adding project
        };
        reader.readAsDataURL(imageUpload.files[0]);
        
    } else {
        // Existing solo project logic
        // ... rest of the solo project code
    }
});

function downloadImage(projectId) {
    const projectData = JSON.parse(localStorage.getItem(projectId));
    const link = document.createElement('a');
    link.href = projectData.imageData;
    link.download = `project-${projectId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function openImageInNewTab(projectId) {
    const projectData = JSON.parse(localStorage.getItem(projectId));
    window.open(projectData.imageData, '_blank');
}

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;
    
    if (!text || !date || !time) {
        alert("Please fill in all task fields (task name, date, and time)");
        return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    
    if (selectedDateTime < now) {
        alert("Task date and time cannot be in the past!");
        return;
    }
    
    if (text) {
        addTaskToList(text, false, currentProjectCard.dataset.id, date, time);
        saveTasks(currentProjectCard.dataset.id);
        taskInput.value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('taskTime').value = '';
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

cancelProjectDetailsBtn.addEventListener('click', () => {
    projectDetailsPopup.classList.remove('show');
    
    // Re-enable sidebar and project cards
    sidebar.classList.remove('disabled');
    document.querySelectorAll('.card').forEach(card => {
        card.style.pointerEvents = 'auto';
        card.style.opacity = '1';
    });
});

document.getElementById('myGroupLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.content-view').forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById('myGroupView').style.display = 'block';
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
});

feedbackLink.addEventListener('click', (e) => {
    e.preventDefault();
    showFeedbackPopup();
});

function showFeedbackPopup() {
    // Create and show backdrop
    let backdrop = document.querySelector('.popup-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'popup-backdrop';
        document.body.appendChild(backdrop);
    }
    
    feedbackPopup.classList.add('show');
    backdrop.classList.add('show');
    feedbackInput.value = '';
    
    // Disable sidebar and project cards
    sidebar.classList.add('disabled');
    document.querySelectorAll('.card').forEach(card => {
        card.style.pointerEvents = 'none';
        card.style.opacity = '0.5';
    });
    fabButton.classList.add('disabled');
    fabButton.setAttribute('disabled', 'disabled');
}

function closeFeedbackPopup() {
    const backdrop = document.querySelector('.popup-backdrop');
    feedbackPopup.classList.remove('show');
    if (backdrop) {
        backdrop.classList.remove('show');
        setTimeout(() => backdrop.remove(), 300);
    }
    
    // Re-enable sidebar and project cards
    sidebar.classList.remove('disabled');
    document.querySelectorAll('.card').forEach(card => {
        card.style.pointerEvents = 'auto';
        card.style.opacity = '1';
    });
    fabButton.classList.remove('disabled');
    fabButton.removeAttribute('disabled');
}

sendFeedbackBtn.addEventListener('click', () => {
    if (feedbackInput.value.trim() === '') {
        alert('Please enter your feedback before sending.');
        return;
    }
    
    // Here you would normally send the feedback to a server
    // For now, we'll just show the thank you notification
    closeFeedbackPopup();
    showFeedbackNotification();
    
    // Clear the input
    feedbackInput.value = '';
});

function showFeedbackNotification() {
    feedbackNotification.classList.add('show');
    
    // Remove the notification after 5 seconds
    setTimeout(() => {
        hideFeedbackNotification();
    }, 5000);
}

function hideFeedbackNotification() {
    feedbackNotification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
        feedbackNotification.classList.remove('show');
        feedbackNotification.style.animation = '';
    }, 300);
}

// Add click event for notification close button
document.querySelector('.notification-close').addEventListener('click', () => {
    hideFeedbackNotification();
});

const groupEmployees = [
    { name: "Employee 1", id: "emp1" },
    { name: "Employee 2", id: "emp2" },
    { name: "Employee 3", id: "emp3" }
];

// For demo: No one has submitted yet
function showSubmissionPopup(projectId) {
    const submissionPopup = document.getElementById('submissionPopup');
    const submissionList = document.getElementById('submissionList');
    submissionList.innerHTML = '';

    // Get employee names from My Group view
    const groupView = document.getElementById('myGroupView');
    const memberCards = groupView.querySelectorAll('.member-card');
    const employees = [];

    memberCards.forEach(card => {
        const nameElem = card.querySelector('h3');
        const roleElem = card.querySelector('.role');
        if (nameElem && roleElem && roleElem.textContent.trim().toLowerCase() === 'employee') {
            employees.push(nameElem.textContent.trim());
        }
    });

    if (employees.length === 0) {
        submissionList.innerHTML = '<div>No employees found in group.</div>';
    } else {
        employees.forEach((empName, idx) => {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.justifyContent = 'space-between';
            row.style.margin = '10px 0';

            if (idx === 2) { // Third employee (Rainier)
                row.innerHTML = `
                    <span>${empName}</span>
                    <span style="display:flex;align-items:center;gap:8px;">
                        <span style="color:green;font-size:20px;">&#10004;</span>
                        <button class="image-action-btn" onclick="window.open('InfomanPeta.pdf', '_blank')">
                            <i class="fas fa-file-pdf"></i> View File
                        </button>
                    </span>
                `;
            } else {
                row.innerHTML = `
                    <span>${empName}</span>
                    <span style="color:red;font-size:20px;">&#10060;</span>
                `;
            }
            submissionList.appendChild(row);
        });
    }

    submissionPopup.classList.add('show');
}

function closeSubmissionPopup() {
    document.getElementById('submissionPopup').classList.remove('show');
}
function closeProjectDetailsPopup() {
    const popup = document.getElementById('projectDetailsPopup');
    popup.classList.remove('show');

    // Re-enable sidebar and project cards
    sidebar.classList.remove('disabled');
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('disabled');
        card.style.pointerEvents = '';
    });
}
function ensureAssignmentProjectForEmployee() {
    // Only add if not already present
    const projectId = 'assignment_project';
    if (!localStorage.getItem(projectId)) {
        const projectData = {
            name: 'Assignment',
            date: new Date().toISOString().slice(0, 10),
            time: '23:59',
            fileUrl: '', // No admin file for employee
            fileName: ''
        };
        localStorage.setItem(projectId, JSON.stringify(projectData));
    }
    // Add the card to the dashboard if not present
    if (!document.querySelector(`.card[data-id="${projectId}"]`)) {
        let project = document.createElement("div");
        project.classList.add("card");
        project.dataset.created = new Date().toISOString();
        project.dataset.id = projectId;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'project-title';
        titleDiv.textContent = 'Assignment';
        project.appendChild(titleDiv);

        projectContainer.insertBefore(project, noProjectsMsg);
        noProjectsMsg.style.display = "none";

        project.addEventListener("click", function() {
            currentProjectCard = project;
            projectDetailsTitle.textContent = 'Assignment';
            loadTasks(projectId);
            projectDetailsPopup.classList.add('show');
        });
    }
}
employeeChoice.addEventListener("click", () => {
    userRole = 'employee'; // Set role as employee
    showCodeEntryPopup();
    // Add Assignment project after joining
    setTimeout(() => {
        ensureAssignmentProjectForEmployee();
    }, 500);
});