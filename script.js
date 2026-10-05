document.addEventListener("DOMContentLoaded", () => {

    /* YEAR */

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* LANDING MOBILE MENU */

    const landingMenuBtn = document.getElementById("landingMenuBtn");
    const landingNav = document.getElementById("landingNav");

    if (landingMenuBtn && landingNav) {

        landingMenuBtn.addEventListener("click", () => {
            landingNav.classList.toggle("show");
        });

        landingNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                landingNav.classList.remove("show");
            });

        });
    }


    /* PASSWORD SHOW / HIDE */

    const togglePassword = document.getElementById("togglePassword");
    const loginPassword = document.getElementById("loginPassword");

    if (togglePassword && loginPassword) {

        togglePassword.addEventListener("click", () => {

            if (loginPassword.type === "password") {
                loginPassword.type = "text";
                togglePassword.textContent = "Hide";
            } else {
                loginPassword.type = "password";
                togglePassword.textContent = "Show";
            }

        });
    }


    /* LOGIN */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();

            const username =
                document.getElementById("loginUsername").value.trim();

            const password =
                document.getElementById("loginPassword").value;

            const remember =
                document.getElementById("rememberMe").checked;

            const message =
                document.getElementById("loginMessage");


            const accounts = [

                {
                    username: "admin",
                    email: "admin@slms.edu",
                    password: "admin123",
                    role: "Admin"
                },

                {
                    username: "instructor",
                    email: "instructor@slms.edu",
                    password: "instructor123",
                    role: "Instructor"
                },

                {
                    username: "student",
                    email: "student@slms.edu",
                    password: "student123",
                    role: "Student"
                }

            ];


            const account = accounts.find(user =>

                (user.username === username ||
                 user.email === username) &&
                 user.password === password

            );


            if (!account) {

                message.textContent =
                    "Invalid username/email or password.";

                message.classList.add("show");

                return;
            }


            const authData = {

                loggedIn: true,
                username: account.username,
                role: account.role,
                loginTime: new Date().toISOString()

            };


            localStorage.setItem(
                "slmsAuth",
                JSON.stringify(authData)
            );


            if (remember) {

                localStorage.setItem(
                    "slmsRemember",
                    "true"
                );

            } else {

                localStorage.removeItem(
                    "slmsRemember"
                );

            }


            if (account.role === "Admin") {

                window.location.href = "admin.html";

            } else if (account.role === "Instructor") {

                window.location.href =
                    "login.html?role=instructor";

            } else {

                window.location.href =
                    "login.html?role=student";

            }

        });

    }


    /* FORGOT PASSWORD */

    const forgotPassword =
        document.getElementById("forgotPassword");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", event => {

            event.preventDefault();

            alert(
                "Password recovery is not connected in this frontend prototype."
            );

        });

    }


    /* INSTRUCTOR / STUDENT PLACEHOLDER */

    const params = new URLSearchParams(
        window.location.search
    );

    const selectedRole = params.get("role");

    if (
        document.getElementById("loginForm") &&
        selectedRole
    ) {

        const message =
            document.getElementById("loginMessage");

        if (selectedRole === "instructor") {

            message.textContent =
                "Instructor dashboard placeholder. This role is prepared for future development.";

        } else if (selectedRole === "student") {

            message.textContent =
                "Student dashboard placeholder. This role is prepared for future development.";

        }

        message.classList.add("show");

    }

});