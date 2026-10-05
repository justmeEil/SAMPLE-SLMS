document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       AUTHENTICATION
    ========================================================= */

    const auth = JSON.parse(
        localStorage.getItem("slmsAuth") || "null"
    );

    if (
        !auth ||
        auth.loggedIn !== true ||
        auth.role !== "Admin"
    ) {
        window.location.href = "login.html";
        return;
    }


    /* =========================================================
       STORAGE HELPERS
    ========================================================= */

    function getData(key, fallback) {

        const data = localStorage.getItem(key);

        if (!data) {

            localStorage.setItem(
                key,
                JSON.stringify(fallback)
            );

            return fallback;
        }

        try {
            return JSON.parse(data);
        } catch {
            return fallback;
        }
    }


    function saveData(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }


    /* =========================================================
       DEMO DATA
    ========================================================= */

    let users = getData("slmsUsers", [

        {
            id: "STU-001",
            firstName: "Juan",
            middleName: "B.",
            lastName: "Dela Cruz",
            username: "juan",
            email: "juan@slms.edu",
            password: "student123",
            role: "Student",
            contact: "09170000001",
            course: "BS Information Technology",
            year: "2nd Year",
            department: "",
            status: "Active"
        },

        {
            id: "STU-002",
            firstName: "Maria",
            middleName: "L.",
            lastName: "Santos",
            username: "maria",
            email: "maria@slms.edu",
            password: "student123",
            role: "Student",
            contact: "09170000002",
            course: "BS Computer Science",
            year: "1st Year",
            department: "",
            status: "Active"
        },

        {
            id: "INS-001",
            firstName: "Pedro",
            middleName: "R.",
            lastName: "Reyes",
            username: "pedro",
            email: "pedro@slms.edu",
            password: "instructor123",
            role: "Instructor",
            contact: "09170000003",
            course: "",
            year: "",
            department: "Information Technology",
            status: "Active"
        },

        {
            id: "INS-002",
            firstName: "Ana",
            middleName: "M.",
            lastName: "Garcia",
            username: "ana",
            email: "ana@slms.edu",
            password: "instructor123",
            role: "Instructor",
            contact: "09170000004",
            course: "",
            year: "",
            department: "Computer Science",
            status: "Active"
        },

        {
            id: "ADM-001",
            firstName: "System",
            middleName: "",
            lastName: "Administrator",
            username: "admin",
            email: "admin@slms.edu",
            password: "admin123",
            role: "Administrator",
            contact: "09170000000",
            course: "",
            year: "",
            department: "Administration",
            status: "Active"
        }

    ]);


    let courses = getData("slmsCourses", [

        {
            id: "CRS-001",
            code: "BSIT",
            name: "BS Information Technology",
            instructor: "Pedro Reyes",
            students: 520,
            status: "Active"
        },

        {
            id: "CRS-002",
            code: "BSCS",
            name: "BS Computer Science",
            instructor: "Ana Garcia",
            students: 410,
            status: "Active"
        },

        {
            id: "CRS-003",
            code: "BSIS",
            name: "BS Information Systems",
            instructor: "Pedro Reyes",
            students: 315,
            status: "Active"
        }

    ]);


    let subjects = getData("slmsSubjects", [

        {
            id: "SUB-001",
            code: "IT101",
            name: "Introduction to Computing",
            course: "BS Information Technology",
            units: 3,
            instructor: "Pedro Reyes",
            status: "Active"
        },

        {
            id: "SUB-002",
            code: "IT102",
            name: "Programming 1",
            course: "BS Information Technology",
            units: 3,
            instructor: "Pedro Reyes",
            status: "Active"
        },

        {
            id: "SUB-003",
            code: "CS101",
            name: "Computer Programming",
            course: "BS Computer Science",
            units: 3,
            instructor: "Ana Garcia",
            status: "Active"
        }

    ]);


    let classes = getData("slmsClasses", [

        {
            id: "CLS-001",
            name: "BSIT 2-108",
            subject: "Programming 1",
            instructor: "Pedro Reyes",
            schedule: "Mon/Wed 9:00 AM",
            room: "Lab 101",
            schoolYear: "2026-2027",
            semester: "1st Semester"
        },

        {
            id: "CLS-002",
            name: "BSCS 1-201",
            subject: "Computer Programming",
            instructor: "Ana Garcia",
            schedule: "Tue/Thu 1:00 PM",
            room: "Lab 102",
            schoolYear: "2026-2027",
            semester: "1st Semester"
        }

    ]);


    let materials = getData("slmsMaterials", [

        {
            id: "MAT-001",
            title: "Java Programming Reviewer",
            category: "Documents",
            course: "BS Information Technology",
            subject: "Programming 1",
            file: "java-reviewer.pdf",
            status: "Published"
        },

        {
            id: "MAT-002",
            title: "Introduction to Computing Slides",
            category: "Presentations",
            course: "BS Information Technology",
            subject: "Introduction to Computing",
            file: "intro-computing.pptx",
            status: "Published"
        }

    ]);


    let announcements = getData("slmsAnnouncements", [

        {
            id: "ANN-001",
            title: "Welcome to the New Academic Year",
            content: "Welcome to SLMS.",
            audience: "All Users",
            date: "2026-08-01",
            status: "Published"
        },

        {
            id: "ANN-002",
            title: "Enrollment Reminder",
            content: "Please complete your enrollment requirements.",
            audience: "Students",
            date: "2026-08-10",
            status: "Published"
        }

    ]);


    let enrollments = getData("slmsEnrollments", [

        {
            id: "ENR-001",
            student: "Juan Dela Cruz",
            course: "BS Information Technology",
            year: "2nd Year",
            date: "2026-08-15",
            status: "Pending"
        },

        {
            id: "ENR-002",
            student: "Maria Santos",
            course: "BS Computer Science",
            year: "1st Year",
            date: "2026-08-16",
            status: "Approved"
        },

        {
            id: "ENR-003",
            student: "Kevin Ramos",
            course: "BS Information Systems",
            year: "1st Year",
            date: "2026-08-17",
            status: "Pending"
        }

    ]);


    let records = getData("slmsRecords", [

        {
            id: "REC-001",
            student: "Juan Dela Cruz",
            subject: "Programming 1",
            grade: "1.75",
            units: 3,
            semester: "1st Semester",
            year: "2026-2027",
            remarks: "Passed"
        },

        {
            id: "REC-002",
            student: "Maria Santos",
            subject: "Computer Programming",
            grade: "2.00",
            units: 3,
            semester: "1st Semester",
            year: "2026-2027",
            remarks: "Passed"
        }

    ]);


    let logs = getData("slmsLogs", [
        {
            date: new Date().toLocaleString(),
            user: "Administrator",
            action: "Admin logged in",
            module: "Authentication",
            status: "Success"
        }
    ]);


    /* =========================================================
       LOGGING
    ========================================================= */

    function addLog(action, module, status = "Success") {

        logs.unshift({

            date: new Date().toLocaleString(),

            user: "Administrator",

            action: action,

            module: module,

            status: status

        });

        logs = logs.slice(0, 100);

        saveData("slmsLogs", logs);

        renderLogs();
    }


    /* =========================================================
       TOAST
    ========================================================= */

    function showToast(message) {

        const container =
            document.getElementById("toastContainer");

        const toast =
            document.createElement("div");

        toast.className = "toast";

        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {

            toast.remove();

        }, 3000);

    }


    /* =========================================================
       SIDEBAR
    ========================================================= */

    const sidebar =
        document.getElementById("sidebar");

    const sidebarToggle =
        document.getElementById("sidebarToggle");

    const sidebarClose =
        document.getElementById("sidebarClose");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    function openSidebar() {

        sidebar.classList.add("open");

        sidebarOverlay.classList.add("show");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

    }


    sidebarToggle.addEventListener(
        "click",
        openSidebar
    );

    sidebarClose.addEventListener(
        "click",
        closeSidebar
    );

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );


    /* =========================================================
       NAVIGATION
    ========================================================= */

    const navButtons =
        document.querySelectorAll(
            "[data-section]"
        );


    function showSection(section) {

        document
            .querySelectorAll(".content-section")
            .forEach(item => {

                item.classList.remove(
                    "active-section"
                );

            });


        const target =
            document.getElementById(
                "section-" + section
            );


        if (target) {

            target.classList.add(
                "active-section"
            );

        }


        document
            .querySelectorAll(
                ".nav-item[data-section], .submenu-item"
            )
            .forEach(item => {

                item.classList.remove("active");

            });


        document
            .querySelectorAll(
                `[data-section="${section}"]`
            )
            .forEach(item => {

                item.classList.add("active");

            });


        const active =
            document.querySelector(
                `[data-section="${section}"]`
            );


        if (active) {

            const text =
                active.textContent.trim();

            document.getElementById(
                "breadcrumb"
            ).textContent = text;

        }


        closeSidebar();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    navButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;

                showSection(section);

            }
        );

    });


    document
        .querySelectorAll(".group-toggle")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button
                        .parentElement
                        .classList.toggle("open");

                }
            );

        });


    /* =========================================================
       PROFILE MENU
    ========================================================= */

    const profileBtn =
        document.getElementById("profileBtn");

    const profileMenu =
        document.getElementById("profileMenu");


    profileBtn.addEventListener("click", event => {

        event.stopPropagation();

        profileMenu.classList.toggle("show");

    });


    document.addEventListener("click", () => {

        profileMenu.classList.remove("show");

        document
            .getElementById("notificationPanel")
            .classList.remove("show");

    });


    profileMenu.addEventListener(
        "click",
        event => event.stopPropagation()
    );


    profileMenu
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.section
                    );

                    profileMenu.classList.remove(
                        "show"
                    );

                }
            );

        });


    /* =========================================================
       NOTIFICATIONS
    ========================================================= */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    const notificationPanel =
        document.getElementById(
            "notificationPanel"
        );


    notificationBtn.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            profileMenu.classList.remove("show");

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );


    notificationPanel.addEventListener(
        "click",
        event => event.stopPropagation()
    );


    document
        .getElementById("clearNotifications")
        .addEventListener("click", () => {

            document.getElementById(
                "notificationList"
            ).innerHTML =
                `<div class="notification-item">
                    <strong>No new notifications</strong>
                    <span>You're all caught up.</span>
                </div>`;

            document.getElementById(
                "notificationCount"
            ).textContent = "0";

            showToast(
                "Notifications cleared."
            );

        });


    /* =========================================================
       MODALS
    ========================================================= */

    function openModal(id) {

        document
            .getElementById(id)
            .classList.add("show");

    }


    function closeModal(id) {

        document
            .getElementById(id)
            .classList.remove("show");

    }


    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        });


    document
        .querySelectorAll(".modal-overlay")
        .forEach(overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target === overlay
                    ) {

                        overlay.classList.remove(
                            "show"
                        );

                    }

                }
            );

        });


    /* =========================================================
       USER MANAGEMENT
    ========================================================= */

    const userModal =
        document.getElementById("userModal");

    const userForm =
        document.getElementById("userForm");

    let editingUserId = null;


    function fullName(user) {

        return [
            user.firstName,
            user.middleName,
            user.lastName
        ]
            .filter(Boolean)
            .join(" ");

    }


    function renderUsers() {

        const studentsTable =
            document.getElementById(
                "studentsTable"
            );

        const instructorsTable =
            document.getElementById(
                "instructorsTable"
            );

        const administratorsTable =
            document.getElementById(
                "administratorsTable"
            );


        studentsTable.innerHTML = "";

        instructorsTable.innerHTML = "";

        administratorsTable.innerHTML = "";


        users.forEach(user => {

            if (user.role === "Student") {

                studentsTable.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${fullName(user)}</td>
                        <td>${user.email}</td>
                        <td>${user.course || "-"}</td>
                        <td>${user.year || "-"}</td>
                        <td>
                            <span class="status-badge">
                                ${user.status}
                            </span>
                        </td>
                        <td>
                            ${userActions(user.id)}
                        </td>
                    </tr>
                `;

            }


            if (user.role === "Instructor") {

                instructorsTable.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${fullName(user)}</td>
                        <td>${user.email}</td>
                        <td>${user.department || "-"}</td>
                        <td>
                            <span class="status-badge">
                                ${user.status}
                            </span>
                        </td>
                        <td>
                            ${userActions(user.id)}
                        </td>
                    </tr>
                `;

            }


            if (user.role === "Administrator") {

                administratorsTable.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${fullName(user)}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td>
                            <span class="status-badge">
                                ${user.status}
                            </span>
                        </td>
                        <td>
                            ${userActions(user.id)}
                        </td>
                    </tr>
                `;

            }

        });


        attachUserActions();

        updateDashboardStats();

    }


    function userActions(id) {

        return `
            <div class="action-buttons">

                <button
                    class="action-btn view-user"
                    data-id="${id}">
                    View
                </button>

                <button
                    class="action-btn edit-user"
                    data-id="${id}">
                    Edit
                </button>

                <button
                    class="action-btn delete-user"
                    data-id="${id}">
                    Delete
                </button>

            </div>
        `;

    }


    function attachUserActions() {

        document
            .querySelectorAll(".view-user")
            .forEach(button => {

                button.onclick = () => {

                    const user =
                        users.find(
                            item =>
                                item.id ===
                                button.dataset.id
                        );

                    if (!user) return;

                    alert(
                        "User Details\n\n" +
                        "ID: " + user.id + "\n" +
                        "Name: " + fullName(user) + "\n" +
                        "Username: " + user.username + "\n" +
                        "Email: " + user.email + "\n" +
                        "Role: " + user.role + "\n" +
                        "Contact: " + user.contact + "\n" +
                        "Status: " + user.status
                    );

                };

            });


        document
            .querySelectorAll(".edit-user")
            .forEach(button => {

                button.onclick = () => {

                    openEditUser(
                        button.dataset.id
                    );

                };

            });


        document
            .querySelectorAll(".delete-user")
            .forEach(button => {

                button.onclick = () => {

                    confirmDeleteUser(
                        button.dataset.id
                    );

                };

            });

    }


    function openAddUser(role = "Student") {

        editingUserId = null;

        userForm.reset();

        document.getElementById(
            "userModalTitle"
        ).textContent = "Add User";

        document.getElementById(
            "role"
        ).value = role;

        document.getElementById(
            "userId"
        ).value = "";

        openModal("userModal");

    }


    function openEditUser(id) {

        const user =
            users.find(
                item => item.id === id
            );

        if (!user) return;

        editingUserId = id;

        document.getElementById(
            "userModalTitle"
        ).textContent = "Edit User";

        document.getElementById(
            "userId"
        ).value = user.id;

        document.getElementById(
            "firstName"
        ).value = user.firstName;

        document.getElementById(
            "middleName"
        ).value = user.middleName;

        document.getElementById(
            "lastName"
        ).value = user.lastName;

        document.getElementById(
            "username"
        ).value = user.username;

        document.getElementById(
            "email"
        ).value = user.email;

        document.getElementById(
            "password"
        ).value = user.password;

        document.getElementById(
            "role"
        ).value =
            user.role === "Administrator"
                ? "Administrator"
                : user.role;

        document.getElementById(
            "contactNumber"
        ).value = user.contact;

        document.getElementById(
            "status"
        ).value = user.status;

        openModal("userModal");

    }


    userForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const role =
                document.getElementById(
                    "role"
                ).value;


            if (editingUserId) {

                const user =
                    users.find(
                        item =>
                            item.id ===
                            editingUserId
                    );

                if (!user) return;


                user.firstName =
                    document.getElementById(
                        "firstName"
                    ).value;

                user.middleName =
                    document.getElementById(
                        "middleName"
                    ).value;

                user.lastName =
                    document.getElementById(
                        "lastName"
                    ).value;

                user.username =
                    document.getElementById(
                        "username"
                    ).value;

                user.email =
                    document.getElementById(
                        "email"
                    ).value;

                user.password =
                    document.getElementById(
                        "password"
                    ).value ||
                    user.password;

                user.role = role;

                user.contact =
                    document.getElementById(
                        "contactNumber"
                    ).value;

                user.status =
                    document.getElementById(
                        "status"
                    ).value;


                addLog(
                    "Edited user " + user.id,
                    "User Management"
                );

                showToast(
                    "User updated successfully."
                );

            } else {

                const prefix =
                    role === "Student"
                        ? "STU"
                        : role === "Instructor"
                        ? "INS"
                        : "ADM";


                const newUser = {

                    id:
                        prefix +
                        "-" +
                        String(
                            Date.now()
                        ).slice(-5),

                    firstName:
                        document.getElementById(
                            "firstName"
                        ).value,

                    middleName:
                        document.getElementById(
                            "middleName"
                        ).value,

                    lastName:
                        document.getElementById(
                            "lastName"
                        ).value,

                    username:
                        document.getElementById(
                            "username"
                        ).value,

                    email:
                        document.getElementById(
                            "email"
                        ).value,

                    password:
                        document.getElementById(
                            "password"
                        ).value ||
                        "password123",

                    role: role,

                    contact:
                        document.getElementById(
                            "contactNumber"
                        ).value,

                    course:
                        role === "Student"
                            ? "BS Information Technology"
                            : "",

                    year:
                        role === "Student"
                            ? "1st Year"
                            : "",

                    department:
                        role === "Instructor"
                            ? "Information Technology"
                            : "",

                    status:
                        document.getElementById(
                            "status"
                        ).value

                };


                users.push(newUser);

                addLog(
                    "Added new " + role,
                    "User Management"
                );

                showToast(
                    "User added successfully."
                );

            }


            saveData(
                "slmsUsers",
                users
            );

            renderUsers();

            closeModal("userModal");

        }
    );


    /* =========================================================
       DELETE CONFIRMATION
    ========================================================= */

    let confirmCallback = null;


    function showConfirm(
        title,
        message,
        callback
    ) {

        document.getElementById(
            "confirmTitle"
        ).textContent = title;

        document.getElementById(
            "confirmMessage"
        ).textContent = message;

        confirmCallback = callback;

        openModal("confirmModal");

    }


    document
        .getElementById("confirmAction")
        .addEventListener(
            "click",
            () => {

                if (confirmCallback) {
                    confirmCallback();
                }

                closeModal(
                    "confirmModal"
                );

            }
        );


    function confirmDeleteUser(id) {

        showConfirm(

            "Delete User",

            "Are you sure you want to delete this user?",

            () => {

                const user =
                    users.find(
                        item =>
                            item.id === id
                    );

                users =
                    users.filter(
                        item =>
                            item.id !== id
                    );

                saveData(
                    "slmsUsers",
                    users
                );

                renderUsers();

                addLog(
                    "Deleted user " +
                    (user ? user.id : id),
                    "User Management"
                );

                showToast(
                    "User deleted successfully."
                );

            }

        );

    }


    /* =========================================================
       ADD USER BUTTONS
    ========================================================= */

    document
        .querySelectorAll(".add-user-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openAddUser(
                        button.dataset.role
                    );

                }
            );

        });


    document
        .getElementById("quickAddUser")
        .addEventListener(
            "click",
            () => openAddUser("Student")
        );


    /* =========================================================
       USER SEARCH
    ========================================================= */

    function userSearch() {

        const studentQuery =
            document
                .querySelector(".user-search")
                .value
                .toLowerCase();

        const instructorQuery =
            document
                .querySelector(".instructor-search")
                .value
                .toLowerCase();

        const adminQuery =
            document
                .querySelector(".admin-search")
                .value
                .toLowerCase();


        filterUserTable(
            "studentsTable",
            studentQuery
        );

        filterUserTable(
            "instructorsTable",
            instructorQuery
        );

        filterUserTable(
            "administratorsTable",
            adminQuery
        );

    }


    function filterUserTable(
        tableId,
        query
    ) {

        const rows =
            document.querySelectorAll(
                "#" +
                tableId +
                " tr"
            );

        rows.forEach(row => {

            row.style.display =
                row.textContent
                    .toLowerCase()
                    .includes(query)
                    ? ""
                    : "none";

        });

    }


    document
        .querySelectorAll(
            ".user-search, .instructor-search, .admin-search"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                userSearch
            );

        });


    /* =========================================================
       GENERIC CRUD MODAL
    ========================================================= */

    let genericType = null;

    let editingGenericId = null;


    const genericForm =
        document.getElementById(
            "genericForm"
        );


    function openGeneric(
        type,
        record = null
    ) {

        genericType = type;

        editingGenericId =
            record ? record.id : null;

        const fields =
            document.getElementById(
                "genericFields"
            );

        fields.innerHTML = "";


        const configs = {

            course: [

                ["code", "Course Code", "text"],
                ["name", "Course Name", "text"],
                ["instructor", "Instructor", "text"],
                ["students", "Students", "number"],
                ["status", "Status", "select", ["Active", "Inactive"]]

            ],

            subject: [

                ["code", "Subject Code", "text"],
                ["name", "Subject Name", "text"],
                ["course", "Course", "text"],
                ["units", "Units", "number"],
                ["instructor", "Instructor", "text"],
                ["status", "Status", "select", ["Active", "Inactive"]]

            ],

            class: [

                ["name", "Class Name", "text"],
                ["subject", "Subject", "text"],
                ["instructor", "Instructor", "text"],
                ["schedule", "Schedule", "text"],
                ["room", "Room", "text"],
                ["schoolYear", "School Year", "text"],
                ["semester", "Semester", "select", ["1st Semester", "2nd Semester", "Summer"]]

            ],

            material: [

                ["title", "Title", "text"],
                ["category", "Category", "select", ["Documents", "Presentations", "Videos", "Links", "Assignments"]],
                ["course", "Course", "text"],
                ["subject", "Subject", "text"],
                ["file", "File / Link", "text"],
                ["status", "Status", "select", ["Published", "Unpublished"]]

            ],

            announcement: [

                ["title", "Title", "text"],
                ["content", "Content", "textarea"],
                ["audience", "Target Audience", "select", ["All Users", "Students", "Instructors", "Specific Course"]],
                ["date", "Date", "date"],
                ["status", "Status", "select", ["Published", "Unpublished"]]

            ]

        };


        const selected =
            configs[type];


        document.getElementById(
            "genericModalTitle"
        ).textContent =
            record
                ? "Edit " + capitalize(type)
                : "Add " + capitalize(type);


        selected.forEach(config => {

            const [
                key,
                label,
                inputType,
                options
            ] = config;


            const group =
                document.createElement(
                    "div"
                );

            group.className =
                "form-group";


            const labelElement =
                document.createElement(
                    "label"
                );

            labelElement.textContent =
                label;


            let input;


            if (inputType === "select") {

                input =
                    document.createElement(
                        "select"
                    );

                options.forEach(option => {

                    const optionElement =
                        document.createElement(
                            "option"
                        );

                    optionElement.value =
                        option;

                    optionElement.textContent =
                        option;

                    input.appendChild(
                        optionElement
                    );

                });

            } else if (
                inputType === "textarea"
            ) {

                input =
                    document.createElement(
                        "textarea"
                    );

            } else {

                input =
                    document.createElement(
                        "input"
                    );

                input.type = inputType;

            }


            input.id =
                "generic-" + key;

            input.required =
                key !== "students";


            if (record) {

                input.value =
                    record[key] ?? "";

            }


            group.appendChild(
                labelElement
            );

            group.appendChild(
                input
            );

            fields.appendChild(
                group
            );

        });


        openModal(
            "genericModal"
        );

    }


    function capitalize(text) {

        return text.charAt(0).toUpperCase() +
            text.slice(1);

    }


    genericForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const configs = {

                course: courses,

                subject: subjects,

                class: classes,

                material: materials,

                announcement: announcements

            };


            const collection =
                configs[genericType];


            const configMap = {

                course: [
                    "code",
                    "name",
                    "instructor",
                    "students",
                    "status"
                ],

                subject: [
                    "code",
                    "name",
                    "course",
                    "units",
                    "instructor",
                    "status"
                ],

                class: [
                    "name",
                    "subject",
                    "instructor",
                    "schedule",
                    "room",
                    "schoolYear",
                    "semester"
                ],

                material: [
                    "title",
                    "category",
                    "course",
                    "subject",
                    "file",
                    "status"
                ],

                announcement: [
                    "title",
                    "content",
                    "audience",
                    "date",
                    "status"
                ]

            };


            const record = {};


            configMap[
                genericType
            ].forEach(key => {

                let value =
                    document.getElementById(
                        "generic-" + key
                    ).value;

                if (
                    key === "students" ||
                    key === "units"
                ) {

                    value =
                        Number(value || 0);

                }

                record[key] = value;

            });


            if (editingGenericId) {

                const index =
                    collection.findIndex(
                        item =>
                            item.id ===
                            editingGenericId
                    );

                if (index !== -1) {

                    collection[index] = {
                        ...collection[index],
                        ...record
                    };

                }

                addLog(
                    "Edited " +
                    genericType,
                    capitalize(genericType)
                );

                showToast(
                    capitalize(genericType) +
                    " updated successfully."
                );

            } else {

                record.id =
                    getPrefix(
                        genericType
                    ) +
                    "-" +
                    String(
                        Date.now()
                    ).slice(-5);

                collection.push(record);

                addLog(
                    "Created " +
                    genericType,
                    capitalize(genericType)
                );

                showToast(
                    capitalize(genericType) +
                    " added successfully."
                );

            }


            saveData(
                "slms" +
                capitalize(genericType) +
                "s",
                collection
            );


            renderAll();

            closeModal(
                "genericModal"
            );

        }
    );


    function getPrefix(type) {

        const prefixes = {

            course: "CRS",
            subject: "SUB",
            class: "CLS",
            material: "MAT",
            announcement: "ANN"

        };

        return prefixes[type];

    }


    /* =========================================================
       GENERIC TABLE ACTIONS
    ========================================================= */

    function genericActions(
        type,
        id
    ) {

        return `
            <div class="action-buttons">

                <button
                    class="action-btn generic-view"
                    data-type="${type}"
                    data-id="${id}">
                    View
                </button>

                <button
                    class="action-btn generic-edit"
                    data-type="${type}"
                    data-id="${id}">
                    Edit
                </button>

                <button
                    class="action-btn generic-delete"
                    data-type="${type}"
                    data-id="${id}">
                    Delete
                </button>

            </div>
        `;

    }


    function attachGenericActions() {

        document
            .querySelectorAll(".generic-view")
            .forEach(button => {

                button.onclick = () => {

                    const record =
                        findGenericRecord(
                            button.dataset.type,
                            button.dataset.id
                        );

                    if (!record) return;

                    alert(
                        Object.entries(record)
                            .map(
                                ([key, value]) =>
                                    capitalize(key) +
                                    ": " +
                                    value
                            )
                            .join("\n")
                    );

                };

            });


        document
            .querySelectorAll(".generic-edit")
            .forEach(button => {

                button.onclick = () => {

                    const record =
                        findGenericRecord(
                            button.dataset.type,
                            button.dataset.id
                        );

                    if (record) {

                        openGeneric(
                            button.dataset.type,
                            record
                        );

                    }

                };

            });


        document
            .querySelectorAll(".generic-delete")
            .forEach(button => {

                button.onclick = () => {

                    showConfirm(

                        "Delete Record",

                        "Are you sure you want to delete this record?",

                        () => {

                            deleteGenericRecord(
                                button.dataset.type,
                                button.dataset.id
                            );

                        }

                    );

                };

            });

    }


    function findGenericRecord(
        type,
        id
    ) {

        const map = {

            course: courses,
            subject: subjects,
            class: classes,
            material: materials,
            announcement: announcements

        };

        return map[type].find(
            item =>
                item.id === id
        );

    }


    function deleteGenericRecord(
        type,
        id
    ) {

        const map = {

            course: courses,
            subject: subjects,
            class: classes,
            material: materials,
            announcement: announcements

        };


        const collection =
            map[type];


        const index =
            collection.findIndex(
                item =>
                    item.id === id
            );


        if (index === -1) return;


        collection.splice(
            index,
            1
        );


        saveData(
            "slms" +
            capitalize(type) +
            "s",
            collection
        );


        addLog(
            "Deleted " + type,
            capitalize(type)
        );


        showToast(
            capitalize(type) +
            " deleted successfully."
        );


        renderAll();

    }


    /* =========================================================
       RENDER COURSES
    ========================================================= */

    function renderCourses() {

        const table =
            document.getElementById(
                "coursesTable"
            );

        table.innerHTML = "";


        courses.forEach(course => {

            table.innerHTML += `
                <tr>
                    <td>${course.code}</td>
                    <td>${course.name}</td>
                    <td>${course.instructor}</td>
                    <td>${course.students}</td>
                    <td>
                        <span class="status-badge">
                            ${course.status}
                        </span>
                    </td>
                    <td>
                        ${genericActions(
                            "course",
                            course.id
                        )}
                    </td>
                </tr>
            `;

        });

    }


    /* =========================================================
       RENDER SUBJECTS
    ========================================================= */

    function renderSubjects() {

        const table =
            document.getElementById(
                "subjectsTable"
            );

        table.innerHTML = "";


        subjects.forEach(subject => {

            table.innerHTML += `
                <tr>
                    <td>${subject.code}</td>
                    <td>${subject.name}</td>
                    <td>${subject.course}</td>
                    <td>${subject.units}</td>
                    <td>${subject.instructor}</td>
                    <td>
                        <span class="status-badge">
                            ${subject.status}
                        </span>
                    </td>
                    <td>
                        ${genericActions(
                            "subject",
                            subject.id
                        )}
                    </td>
                </tr>
            `;

        });

    }


    /* =========================================================
       RENDER CLASSES
    ========================================================= */

    function renderClasses() {

        const table =
            document.getElementById(
                "classesTable"
            );

        table.innerHTML = "";


        classes.forEach(item => {

            table.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.subject}</td>
                    <td>${item.instructor}</td>
                    <td>${item.schedule}</td>
                    <td>${item.room}</td>
                    <td>${item.schoolYear}</td>
                    <td>${item.semester}</td>
                    <td>
                        ${genericActions(
                            "class",
                            item.id
                        )}
                    </td>
                </tr>
            `;

        });

    }


    /* =========================================================
       RENDER MATERIALS
    ========================================================= */

    function renderMaterials() {

        const table =
            document.getElementById(
                "materialsTable"
            );

        table.innerHTML = "";


        materials.forEach(item => {

            table.innerHTML += `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.category}</td>
                    <td>${item.course}</td>
                    <td>${item.subject}</td>
                    <td>${item.file}</td>
                    <td>
                        <span class="status-badge">
                            ${item.status}
                        </span>
                    </td>
                    <td>
                        ${genericActions(
                            "material",
                            item.id
                        )}
                    </td>
                </tr>
            `;

        });

    }


    /* =========================================================
       RENDER ANNOUNCEMENTS
    ========================================================= */

    function renderAnnouncements() {

        const table =
            document.getElementById(
                "announcementsTable"
            );

        table.innerHTML = "";


        announcements.forEach(item => {

            table.innerHTML += `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.audience}</td>
                    <td>${item.date}</td>
                    <td>
                        <span class="status-badge">
                            ${item.status}
                        </span>
                    </td>
                    <td>
                        ${genericActions(
                            "announcement",
                            item.id
                        )}
                    </td>
                </tr>
            `;

        });

    }


    /* =========================================================
       BUTTONS FOR GENERIC MODALS
    ========================================================= */

    document
        .getElementById("addCourseBtn")
        .addEventListener(
            "click",
            () => openGeneric("course")
        );


    document
        .getElementById("addSubjectBtn")
        .addEventListener(
            "click",
            () => openGeneric("subject")
        );


    document
        .getElementById("addClassBtn")
        .addEventListener(
            "click",
            () => openGeneric("class")
        );


    document
        .getElementById("addMaterialBtn")
        .addEventListener(
            "click",
            () => openGeneric("material")
        );


    document
        .getElementById("addAnnouncementBtn")
        .addEventListener(
            "click",
            () => openGeneric("announcement")
        );


    /* =========================================================
       ENROLLMENTS
    ========================================================= */

    function renderEnrollments() {

        const table =
            document.getElementById(
                "enrollmentsTable"
            );

        const filter =
            document.getElementById(
                "enrollmentFilter"
            ).value;


        table.innerHTML = "";


        enrollments
            .filter(item =>
                !filter ||
                item.status === filter
            )
            .forEach(item => {

                let actions = "";


                if (
                    item.status ===
                    "Pending"
                ) {

                    actions = `
                        <div class="action-buttons">

                            <button
                                class="action-btn approve-enrollment"
                                data-id="${item.id}">
                                Approve
                            </button>

                            <button
                                class="action-btn reject-enrollment"
                                data-id="${item.id}">
                                Reject
                            </button>

                        </div>
                    `;

                } else {

                    actions = `
                        <button
                            class="action-btn view-enrollment"
                            data-id="${item.id}">
                            View
                        </button>
                    `;

                }


                table.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.student}</td>
                        <td>${item.course}</td>
                        <td>${item.year}</td>
                        <td>${item.date}</td>
                        <td>
                            <span class="status-badge">
                                ${item.status}
                            </span>
                        </td>
                        <td>${actions}</td>
                    </tr>
                `;

            });


        document
            .querySelectorAll(
                ".approve-enrollment"
            )
            .forEach(button => {

                button.onclick = () => {

                    updateEnrollment(
                        button.dataset.id,
                        "Approved"
                    );

                };

            });


        document
            .querySelectorAll(
                ".reject-enrollment"
            )
            .forEach(button => {

                button.onclick = () => {

                    updateEnrollment(
                        button.dataset.id,
                        "Rejected"
                    );

                };

            });


        document
            .querySelectorAll(
                ".view-enrollment"
            )
            .forEach(button => {

                button.onclick = () => {

                    const item =
                        enrollments.find(
                            e =>
                                e.id ===
                                button.dataset.id
                        );

                    alert(
                        "Enrollment Details\n\n" +
                        "ID: " + item.id + "\n" +
                        "Student: " + item.student + "\n" +
                        "Course: " + item.course + "\n" +
                        "Year: " + item.year + "\n" +
                        "Date: " + item.date + "\n" +
                        "Status: " + item.status
                    );

                };

            });

    }


    function updateEnrollment(
        id,
        status
    ) {

        const enrollment =
            enrollments.find(
                item =>
                    item.id === id
            );


        if (!enrollment) return;


        enrollment.status =
            status;


        saveData(
            "slmsEnrollments",
            enrollments
        );


        addLog(
            status +
            " enrollment " +
            id,
            "Enrollment Management"
        );


        showToast(
            "Enrollment " +
            status.toLowerCase() +
            "."
        );


        renderEnrollments();

        updateDashboardStats();

    }


    document
        .getElementById(
            "enrollmentFilter"
        )
        .addEventListener(
            "change",
            renderEnrollments
        );


    /* =========================================================
       ACADEMIC RECORDS
    ========================================================= */

    function renderRecords() {

        const table =
            document.getElementById(
                "recordsTable"
            );

        table.innerHTML = "";


        records.forEach(record => {

            table.innerHTML += `
                <tr>
                    <td>${record.student}</td>
                    <td>${record.subject}</td>
                    <td>${record.grade}</td>
                    <td>${record.units}</td>
                    <td>${record.semester}</td>
                    <td>${record.year}</td>
                    <td>
                        <span class="status-badge">
                            ${record.remarks}
                        </span>
                    </td>
                    <td>
                        <button
                            class="action-btn record-view"
                            data-id="${record.id}">
                            View
                        </button>
                    </td>
                </tr>
            `;

        });


        document
            .querySelectorAll(".record-view")
            .forEach(button => {

                button.onclick = () => {

                    const record =
                        records.find(
                            item =>
                                item.id ===
                                button.dataset.id
                        );

                    alert(
                        Object.entries(record)
                            .map(
                                ([key, value]) =>
                                    capitalize(key) +
                                    ": " +
                                    value
                            )
                            .join("\n")
                    );

                };

            });

    }


    /* =========================================================
       SETTINGS
    ========================================================= */

    const defaultSettings = {

        schoolName:
            "SLMS Academic Institution",

        schoolEmail:
            "admin@slms.edu",

        schoolContact:
            "+63 900 000 0000",

        schoolAddress:
            "Philippines",

        systemName:
            "Student Learning Management System",

        academicYear:
            "2026-2027",

        currentSemester:
            "1st Semester",

        maintenanceMode:
            false,

        adminName:
            "Administrator",

        adminEmail:
            "admin@slms.edu",

        adminUsername:
            "admin",

        adminPassword:
            "admin123"

    };


    let settings =
        getData(
            "slmsSettings",
            defaultSettings
        );


    function renderSettings() {

        Object.keys(settings)
            .forEach(key => {

                const element =
                    document.getElementById(
                        key
                    );

                if (!element) return;


                if (
                    element.type ===
                    "checkbox"
                ) {

                    element.checked =
                        settings[key];

                } else {

                    element.value =
                        settings[key];

                }

            });

    }


    document
        .getElementById("settingsForm")
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                Object.keys(defaultSettings)
                    .forEach(key => {

                        const element =
                            document.getElementById(
                                key
                            );

                        if (!element) return;


                        if (
                            element.type ===
                            "checkbox"
                        ) {

                            settings[key] =
                                element.checked;

                        } else {

                            settings[key] =
                                element.value;

                        }

                    });


                saveData(
                    "slmsSettings",
                    settings
                );


                addLog(
                    "Updated system settings",
                    "System Settings"
                );


                showToast(
                    "Settings saved successfully."
                );

            }
        );


    /* =========================================================
       LOGS
    ========================================================= */

    function renderLogs() {

        const table =
            document.getElementById(
                "logsTable"
            );

        if (!table) return;


        table.innerHTML = "";


        logs.forEach(log => {

            table.innerHTML += `
                <tr>
                    <td>${log.date}</td>
                    <td>${log.user}</td>
                    <td>${log.action}</td>
                    <td>${log.module}</td>
                    <td>
                        <span class="status-badge">
                            ${log.status}
                        </span>
                    </td>
                </tr>
            `;

        });

    }


    document
        .getElementById("clearLogs")
        .addEventListener(
            "click",
            () => {

                showConfirm(

                    "Clear Activity Logs",

                    "Are you sure you want to clear all activity logs?",

                    () => {

                        logs = [];

                        saveData(
                            "slmsLogs",
                            logs
                        );

                        renderLogs();

                        showToast(
                            "Activity logs cleared."
                        );

                    }

                );

            }
        );


    /* =========================================================
       DASHBOARD STATISTICS
    ========================================================= */

    function updateDashboardStats() {

        const studentCount =
            users.filter(
                user =>
                    user.role ===
                    "Student"
            ).length;


        const instructorCount =
            users.filter(
                user =>
                    user.role ===
                    "Instructor"
            ).length;


        const pendingCount =
            enrollments.filter(
                item =>
                    item.status ===
                    "Pending"
            ).length;


        const studentElement =
            document.getElementById(
                "totalStudents"
            );

        const instructorElement =
            document.getElementById(
                "totalInstructors"
            );

        const courseElement =
            document.getElementById(
                "totalCourses"
            );

        const subjectElement =
            document.getElementById(
                "totalSubjects"
            );

        const classElement =
            document.getElementById(
                "totalClasses"
            );

        const pendingElement =
            document.getElementById(
                "pendingEnrollments"
            );


        if (studentElement) {

            studentElement.textContent =
                1245 +
                Math.max(
                    0,
                    studentCount - 2
                );

        }


        if (instructorElement) {

            instructorElement.textContent =
                48 +
                Math.max(
                    0,
                    instructorCount - 2
                );

        }


        if (courseElement) {

            courseElement.textContent =
                courses.length;

        }


        if (subjectElement) {

            subjectElement.textContent =
                86 +
                Math.max(
                    0,
                    subjects.length - 3
                );

        }


        if (classElement) {

            classElement.textContent =
                64 +
                Math.max(
                    0,
                    classes.length - 2
                );

        }


        if (pendingElement) {

            pendingElement.textContent =
                pendingCount;

        }

    }


    /* =========================================================
       REPORTS
    ========================================================= */

    document
        .querySelectorAll(
            ".generate-report"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const title =
                        button
                            .parentElement
                            .querySelector(
                                "h3"
                            )
                            .textContent;


                    const output =
                        document.getElementById(
                            "reportOutput"
                        );


                    output.innerHTML = `

                        <h3>${title}</h3>

                        <p>
                            Generated:
                            ${new Date().toLocaleString()}
                        </p>

                        <div class="report-preview-table">

                            <p>
                                This is a frontend-generated
                                report preview using current
                                SLMS sample data.
                            </p>

                            <strong>
                                Total Users:
                                ${users.length}
                            </strong>

                            <br>

                            <strong>
                                Total Courses:
                                ${courses.length}
                            </strong>

                            <br>

                            <strong>
                                Total Subjects:
                                ${subjects.length}
                            </strong>

                            <br>

                            <strong>
                                Total Enrollments:
                                ${enrollments.length}
                            </strong>

                        </div>
                    `;


                    addLog(
                        "Generated " + title,
                        "Reports & Analytics"
                    );


                    showToast(
                        "Report generated."
                    );

                }
            );

        });


    document
        .getElementById("printReport")
        .addEventListener(
            "click",
            () => {

                window.print();

            }
        );


    document
        .getElementById("exportReport")
        .addEventListener(
            "click",
            () => {

                const content =
                    document.getElementById(
                        "reportOutput"
                    ).innerText;


                const blob =
                    new Blob(
                        [content],
                        {
                            type:
                                "text/plain"
                        }
                    );


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href = url;

                link.download =
                    "SLMS-Report.txt";

                link.click();


                URL.revokeObjectURL(
                    url
                );


                addLog(
                    "Exported report",
                    "Reports & Analytics"
                );


                showToast(
                    "Report exported."
                );

            }
        );


    /* =========================================================
       SEARCH FUNCTIONS
    ========================================================= */

    function tableSearch(
        inputId,
        tableId
    ) {

        const input =
            document.getElementById(
                inputId
            );

        if (!input) return;


        input.addEventListener(
            "input",
            () => {

                const query =
                    input.value
                        .toLowerCase();


                document
                    .querySelectorAll(
                        "#" +
                        tableId +
                        " tr"
                    )
                    .forEach(row => {

                        row.style.display =
                            row.textContent
                                .toLowerCase()
                                .includes(query)
                                ? ""
                                : "none";

                    });

            }
        );

    }


    tableSearch(
        "courseSearch",
        "coursesTable"
    );

    tableSearch(
        "subjectSearch",
        "subjectsTable"
    );

    tableSearch(
        "classSearch",
        "classesTable"
    );

    tableSearch(
        "materialSearch",
        "materialsTable"
    );

    tableSearch(
        "announcementSearch",
        "announcementsTable"
    );

    tableSearch(
        "recordSearch",
        "recordsTable"
    );

    tableSearch(
        "logSearch",
        "logsTable"
    );


    /* =========================================================
       MATERIAL FILTER
    ========================================================= */

    document
        .getElementById("materialFilter")
        .addEventListener(
            "change",
            () => {

                const filter =
                    document.getElementById(
                        "materialFilter"
                    ).value;


                document
                    .querySelectorAll(
                        "#materialsTable tr"
                    )
                    .forEach(row => {

                        row.style.display =
                            !filter ||
                            row.textContent
                                .includes(filter)
                                ? ""
                                : "none";

                    });

            }
        );


    /* =========================================================
       LOGOUT
    ========================================================= */

    function logout() {

        showConfirm(

            "Logout",

            "Are you sure you want to logout?",

            () => {

                addLog(
                    "Admin logged out",
                    "Authentication"
                );

                localStorage.removeItem(
                    "slmsAuth"
                );

                window.location.href =
                    "login.html";

            }

        );

    }


    document
        .getElementById("sidebarLogout")
        .addEventListener(
            "click",
            logout
        );


    document
        .getElementById("profileLogout")
        .addEventListener(
            "click",
            logout
        );


    /* =========================================================
       RENDER EVERYTHING
    ========================================================= */

    function renderAll() {

        renderUsers();

        renderCourses();

        renderSubjects();

        renderClasses();

        renderMaterials();

        renderAnnouncements();

        renderEnrollments();

        renderRecords();

        renderLogs();

        renderSettings();

        attachGenericActions();

        updateDashboardStats();

    }


    renderAll();

});