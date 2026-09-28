// ============================================================
// LostPetFinder - Complete Frontend JavaScript
// ============================================================


// ============================================================
// PAGE NAVIGATION
// ============================================================

function showPage(pageId) {

    // Hide every page
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });


    // Show selected page
    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active-page");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // Load user's reports when opening My Reports
    if (pageId === "myReports") {

        loadMyReports();
    }


    // Check admin login when opening Admin
    if (pageId === "admin") {

        checkAdminLogin();
    }
}


// ============================================================
// REGISTER
// ============================================================

document.getElementById("registerForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const phone =
            document.getElementById("registerPhone").value.trim();

        const message =
            document.getElementById("registerMessage");


        try {

            const response = await fetch("/api/users", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone
                })
            });


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error || "Registration failed"
                );
            }


            message.textContent =
                "✅ Registration successful! User ID: "
                + data.userId;

            message.style.color = "green";


            document.getElementById("registerForm").reset();


        } catch (error) {

            console.error(error);

            message.textContent =
                "❌ " + error.message;

            message.style.color = "red";
        }
    }
);


// ============================================================
// USER LOGIN
// ============================================================

document.getElementById("loginForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        try {

            const response = await fetch(
                "/api/users/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error || "Login failed"
                );
            }


            // Store logged-in user
            localStorage.setItem(
                "userId",
                data.userId
            );

            localStorage.setItem(
                "userName",
                data.name
            );


            message.textContent =
                "✅ Login successful! Welcome, "
                + data.name;

            message.style.color = "green";


            setTimeout(function() {

                showPage("home");

            }, 1000);


        } catch (error) {

            console.error(error);

            message.textContent =
                "❌ " + error.message;

            message.style.color = "red";
        }
    }
);


// ============================================================
// REPORT LOST PET
// ============================================================

document.getElementById("lostForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const userId =
            localStorage.getItem("userId");


        if (!userId) {

            alert(
                "Please login before reporting a lost pet."
            );

            showPage("login");

            return;
        }


        const species =
            document.getElementById("lostSpecies").value;

        const breed =
            document.getElementById("lostBreed").value.trim();

        const colour =
            document.getElementById("lostColour").value.trim();

        const location =
            document.getElementById("lostLocation").value.trim();

        const description =
            document.getElementById("lostDescription").value;

        const message =
            document.getElementById("lostMessage");


        try {

            // Create animal
            const animalResponse = await fetch(
                "/api/animals",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        species: species,
                        breed: breed,
                        colour: colour
                    })
                }
            );


            const animalData =
                await animalResponse.json();


            if (!animalResponse.ok) {

                throw new Error(
                    animalData.error ||
                    "Failed to create animal"
                );
            }


            // Create report
            const reportResponse = await fetch(
                "/api/reports",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        reportType: "LOST",

                        animal: {
                            animalId:
                            animalData.animalId
                        },

                        user: {
                            userId:
                                Number(userId)
                        },

                        location: location,

                        description: description
                    })
                }
            );


            const reportData =
                await reportResponse.json();


            if (!reportResponse.ok) {

                throw new Error(
                    reportData.error ||
                    "Failed to create report"
                );
            }


            message.textContent =
                "✅ Lost pet report submitted successfully! Report ID: "
                + reportData.reportId;

            message.style.color = "green";


            document.getElementById("lostForm").reset();


        } catch (error) {

            console.error(error);

            message.textContent =
                "❌ " + error.message;

            message.style.color = "red";
        }
    }
);


// ============================================================
// REPORT FOUND PET
// ============================================================

document.getElementById("foundForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const userId =
            localStorage.getItem("userId");


        if (!userId) {

            alert(
                "Please login before reporting a found pet."
            );

            showPage("login");

            return;
        }


        const species =
            document.getElementById("foundSpecies").value;

        const breed =
            document.getElementById("foundBreed").value.trim();

        const colour =
            document.getElementById("foundColour").value.trim();

        const location =
            document.getElementById("foundLocation").value.trim();

        const description =
            document.getElementById("foundDescription").value;

        const message =
            document.getElementById("foundMessage");


        try {

            // Create animal
            const animalResponse = await fetch(
                "/api/animals",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        species: species,
                        breed: breed,
                        colour: colour
                    })
                }
            );


            const animalData =
                await animalResponse.json();


            if (!animalResponse.ok) {

                throw new Error(
                    animalData.error ||
                    "Failed to create animal"
                );
            }


            // Create report
            const reportResponse = await fetch(
                "/api/reports",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        reportType: "FOUND",

                        animal: {
                            animalId:
                            animalData.animalId
                        },

                        user: {
                            userId:
                                Number(userId)
                        },

                        location: location,

                        description: description
                    })
                }
            );


            const reportData =
                await reportResponse.json();


            if (!reportResponse.ok) {

                throw new Error(
                    reportData.error ||
                    "Failed to create report"
                );
            }


            message.textContent =
                "✅ Found pet report submitted successfully! Report ID: "
                + reportData.reportId;

            message.style.color = "green";


            document.getElementById("foundForm").reset();


        } catch (error) {

            console.error(error);

            message.textContent =
                "❌ " + error.message;

            message.style.color = "red";
        }
    }
);


// ============================================================
// SEARCH REPORTS
// ============================================================

document.getElementById("searchForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const location =
            document.getElementById("searchLocation")
                .value.trim();

        const results =
            document.getElementById("searchResults");


        results.innerHTML =
            "<p>🔍 Searching...</p>";


        try {

            const response = await fetch(
                "/api/reports/search?location="
                + encodeURIComponent(location)
            );


            const reports =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    reports.error ||
                    "Search failed"
                );
            }


            results.innerHTML = "";


            if (reports.length === 0) {

                results.innerHTML =
                    "<p>No reports found for this location.</p>";

                return;
            }


            reports.forEach(function(report) {

                results.appendChild(
                    createReportCard(report)
                );
            });


        } catch (error) {

            console.error(error);

            results.innerHTML =
                "<p>❌ " + error.message + "</p>";
        }
    }
);


// ============================================================
// FIND MATCHES
// ============================================================

document.getElementById("matchesForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const reportId =
            document.getElementById("matchReportId").value;

        const results =
            document.getElementById("matchResults");


        results.innerHTML =
            "<p>🔍 Finding matches...</p>";


        try {

            const response = await fetch(
                "/api/reports/"
                + reportId
                + "/matches"
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Unable to find matches"
                );
            }


            results.innerHTML = "";


            if (data.length === 0) {

                results.innerHTML =
                    "<p>❌ No matching found pets were found.</p>";

                return;
            }


            data.forEach(function(report) {

                const card =
                    createReportCard(report);

                results.appendChild(card);
            });


        } catch (error) {

            console.error(error);

            results.innerHTML =
                "<p>❌ " + error.message + "</p>";
        }
    }
);


// ============================================================
// MY REPORTS
// ============================================================

async function loadMyReports() {

    const userId =
        localStorage.getItem("userId");

    const results =
        document.getElementById("myReportsResults");


    if (!userId) {

        results.innerHTML = `
            <div class="report-card">
                <h3>🔐 Login Required</h3>
                <p>
                    Please login to view your reports.
                </p>

                <button
                    class="primary-button"
                    onclick="showPage('login')">
                    Go to Login
                </button>
            </div>
        `;

        return;
    }


    results.innerHTML =
        "<p>Loading your reports...</p>";


    try {

        const response = await fetch(
            "/api/reports/user/"
            + userId
        );


        const reports =
            await response.json();


        if (!response.ok) {

            throw new Error(
                reports.error ||
                "Unable to load reports"
            );
        }


        results.innerHTML = "";


        if (reports.length === 0) {

            results.innerHTML =
                "<p>You have not created any reports yet.</p>";

            return;
        }


        reports.forEach(function(report) {

            const card =
                createMyReportCard(report);

            results.appendChild(card);
        });


    } catch (error) {

        console.error(error);

        results.innerHTML =
            "<p>❌ " + error.message + "</p>";
    }
}


// ============================================================
// MY REPORT CARD
// ============================================================

function createMyReportCard(report) {

    const card =
        document.createElement("div");

    card.className =
        "report-card";


    let resolveButton = "";


    if (report.status === "ACTIVE") {

        resolveButton = `
            <button
                class="primary-button"
                onclick="resolveReport(${report.reportId})">
                ✅ Mark as Resolved
            </button>
        `;
    }


    card.innerHTML = `

        <h3>
            ${report.reportType === "LOST"
        ? "🐾 Lost Pet"
        : "🐕 Found Pet"}
        </h3>

        <p>
            <strong>Report ID:</strong>
            ${report.reportId}
        </p>

        <p>
            <strong>Species:</strong>
            ${report.animal.species}
        </p>

        <p>
            <strong>Breed:</strong>
            ${report.animal.breed || "Not specified"}
        </p>

        <p>
            <strong>Colour:</strong>
            ${report.animal.colour}
        </p>

        <p>
            <strong>Location:</strong>
            ${report.location}
        </p>

        <p>
            <strong>Description:</strong>
            ${report.description || "No description"}
        </p>

        <p>
            <strong>Status:</strong>
            ${report.status}
        </p>

        <p>
            <strong>Reported At:</strong>
            ${report.reportedAt || "Not available"}
        </p>

        ${resolveButton}
    `;


    return card;
}


// ============================================================
// RESOLVE REPORT
// ============================================================

async function resolveReport(reportId) {

    const confirmed =
        confirm(
            "Are you sure you want to mark this report as resolved?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            "/api/reports/"
            + reportId
            + "/resolve",
            {
                method: "PUT"
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Failed to resolve report"
            );
        }


        alert(
            "✅ Report marked as resolved."
        );


        loadMyReports();


    } catch (error) {

        console.error(error);

        alert(
            "❌ " + error.message
        );
    }
}


// ============================================================
// CREATE GENERAL REPORT CARD
// ============================================================

function createReportCard(report) {

    const card =
        document.createElement("div");

    card.className =
        "report-card";


    card.innerHTML = `

        <h3>
            ${report.reportType === "LOST"
        ? "🐾 Lost Pet"
        : "🐕 Found Pet"}
        </h3>

        <p>
            <strong>Report ID:</strong>
            ${report.reportId}
        </p>

        <p>
            <strong>Type:</strong>
            ${report.reportType}
        </p>

        <p>
            <strong>Species:</strong>
            ${report.animal.species}
        </p>

        <p>
            <strong>Breed:</strong>
            ${report.animal.breed || "Not specified"}
        </p>

        <p>
            <strong>Colour:</strong>
            ${report.animal.colour}
        </p>

        <p>
            <strong>Location:</strong>
            ${report.location}
        </p>

        <p>
            <strong>Description:</strong>
            ${report.description || "No description"}
        </p>

        <p>
            <strong>Status:</strong>
            ${report.status}
        </p>

        <p>
            <strong>Reported At:</strong>
            ${report.reportedAt || "Not available"}
        </p>
    `;


    return card;
}


// ============================================================
// ADMIN LOGIN
// ============================================================

document.getElementById("adminLoginForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document.getElementById("adminEmail").value.trim();

        const password =
            document.getElementById("adminPassword").value;

        const message =
            document.getElementById("adminLoginMessage");


        /*
         * TEMPORARY ADMIN LOGIN
         *
         * Your current Admin backend only has:
         *
         * POST /api/admins
         * GET  /api/admins
         *
         * It does NOT currently have an admin login endpoint.
         *
         * Therefore this frontend uses temporary credentials.
         *
         * We should replace this with real backend
         * authentication later.
         */

        const adminEmail =
            "admin@gmail.com";

        const adminPassword =
            "admin123";


        if (
            email === adminEmail &&
            password === adminPassword
        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            message.textContent =
                "✅ Admin login successful.";

            message.style.color = "green";


            setTimeout(function() {

                checkAdminLogin();

            }, 500);


        } else {

            message.textContent =
                "❌ Invalid admin email or password.";

            message.style.color = "red";
        }
    }
);


// ============================================================
// CHECK ADMIN LOGIN
// ============================================================

function checkAdminLogin() {

    const loggedIn =
        localStorage.getItem(
            "adminLoggedIn"
        );


    const loginBox =
        document.getElementById(
            "adminLoginBox"
        );

    const dashboard =
        document.getElementById(
            "adminDashboard"
        );


    if (loggedIn === "true") {

        loginBox.classList.add("hidden");

        dashboard.classList.remove("hidden");

        loadAdminData();

    } else {

        loginBox.classList.remove("hidden");

        dashboard.classList.add("hidden");
    }
}


// ============================================================
// ADMIN LOGOUT
// ============================================================

function adminLogout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );


    alert(
        "✅ Admin logged out."
    );


    checkAdminLogin();
}


// ============================================================
// LOAD ADMIN DATA
// ============================================================

async function loadAdminData() {

    loadAdmins();

    loadAdminReports();
}


// ============================================================
// LOAD ADMINS
// ============================================================

async function loadAdmins() {

    const adminList =
        document.getElementById(
            "adminList"
        );


    adminList.innerHTML =
        "<p>Loading admins...</p>";


    try {

        const response =
            await fetch(
                "/api/admins"
            );


        const admins =
            await response.json();


        if (!response.ok) {

            throw new Error(
                admins.error ||
                "Failed to load admins"
            );
        }


        adminList.innerHTML = "";


        if (admins.length === 0) {

            adminList.innerHTML =
                "<p>No admins found.</p>";

            return;
        }


        admins.forEach(function(admin) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "admin-card";


            card.innerHTML = `

                <h3>
                    👤 ${admin.name}
                </h3>

                <p>
                    <strong>Admin ID:</strong>
                    ${admin.adminId}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${admin.email}
                </p>
            `;


            adminList.appendChild(card);
        });


    } catch (error) {

        console.error(error);

        adminList.innerHTML =
            "<p>❌ Failed to load admins.</p>";
    }
}


// ============================================================
// LOAD ADMIN REPORTS
// ============================================================

async function loadAdminReports() {

    const reportList =
        document.getElementById(
            "adminReports"
        );


    reportList.innerHTML =
        "<p>Loading reports...</p>";


    try {

        const response =
            await fetch(
                "/api/reports"
            );


        const reports =
            await response.json();


        if (!response.ok) {

            throw new Error(
                reports.error ||
                "Failed to load reports"
            );
        }


        updateAdminStats(reports);


        reportList.innerHTML = "";


        if (reports.length === 0) {

            reportList.innerHTML =
                "<p>No reports found.</p>";

            return;
        }


        reports.forEach(function(report) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "report-card";


            let resolveButton = "";


            if (report.status === "ACTIVE") {

                resolveButton = `
                    <button
                        class="primary-button"
                        onclick="adminResolveReport(${report.reportId})">
                        ✅ Mark as Resolved
                    </button>
                `;
            }


            card.innerHTML = `

                <h3>
                    ${report.reportType === "LOST"
                ? "🐾 Lost Pet"
                : "🐕 Found Pet"}
                </h3>

                <p>
                    <strong>Report ID:</strong>
                    ${report.reportId}
                </p>

                <p>
                    <strong>Species:</strong>
                    ${report.animal.species}
                </p>

                <p>
                    <strong>Breed:</strong>
                    ${report.animal.breed || "Not specified"}
                </p>

                <p>
                    <strong>Colour:</strong>
                    ${report.animal.colour}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${report.location}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${report.description || "No description"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${report.status}
                </p>

                <p>
                    <strong>Reported At:</strong>
                    ${report.reportedAt || "Not available"}
                </p>

                ${resolveButton}
            `;


            reportList.appendChild(card);
        });


    } catch (error) {

        console.error(error);

        reportList.innerHTML =
            "<p>❌ Failed to load reports.</p>";
    }
}


// ============================================================
// ADMIN STATISTICS
// ============================================================

function updateAdminStats(reports) {

    const total =
        reports.length;


    const lost =
        reports.filter(function(report) {

            return report.reportType === "LOST";

        }).length;


    const found =
        reports.filter(function(report) {

            return report.reportType === "FOUND";

        }).length;


    const active =
        reports.filter(function(report) {

            return report.status === "ACTIVE";

        }).length;


    const resolved =
        reports.filter(function(report) {

            return report.status === "RESOLVED";

        }).length;


    document.getElementById(
        "totalReports"
    ).textContent = total;


    document.getElementById(
        "lostReports"
    ).textContent = lost;


    document.getElementById(
        "foundReports"
    ).textContent = found;


    document.getElementById(
        "activeReports"
    ).textContent = active;


    document.getElementById(
        "resolvedReports"
    ).textContent = resolved;
}


// ============================================================
// ADMIN RESOLVE REPORT
// ============================================================

async function adminResolveReport(reportId) {

    const confirmed =
        confirm(
            "Are you sure you want to mark this report as resolved?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                "/api/reports/"
                + reportId
                + "/resolve",
                {
                    method: "PUT"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Failed to resolve report"
            );
        }


        alert(
            "✅ Report marked as resolved."
        );


        loadAdminReports();


    } catch (error) {

        console.error(error);

        alert(
            "❌ " + error.message
        );
    }
}


// ============================================================
// INITIAL PAGE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("home");

    }
);