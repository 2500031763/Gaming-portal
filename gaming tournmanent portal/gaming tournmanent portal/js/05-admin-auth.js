/* ======================================================================
   ADMIN AUTHENTICATION & ACCESS GATE
====================================================================== */
document.querySelectorAll(".auth-tab").forEach(tab=>{
  tab.addEventListener("click", ()=>{
    const isRegister = tab.dataset.authtab === "register";
    document.querySelectorAll(".auth-tab").forEach(item=>item.classList.toggle("active", item.dataset.authtab === tab.dataset.authtab));
    document.getElementById("authFormLogin").style.display = isRegister ? "none" : "block";
    document.getElementById("authFormRegister").style.display = isRegister ? "block" : "none";
  });
});

document.getElementById("registerForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name = e.target.querySelector('input[type="text"]').value.trim();
  const email = e.target.querySelector('input[type="email"]').value.trim();
  const password = e.target.querySelector('input[type="password"]').value;
  if(!name || !email || !password){
    toast("Please complete all registration fields.","danger");
    return;
  }
  state.loggedIn = true;
  state.isAdmin = false;
  state.userRole = "player";
  document.getElementById("avatarBtn").textContent = name.slice(0,2).toUpperCase();
  document.getElementById("avatarBtn").title = name;
  toast("Account created successfully. Welcome to Arena Elite!","success");
  switchView("home");
});

document.getElementById("loginForm").addEventListener("submit", e=>{
  e.preventDefault();
  state.loggedIn = true;
  state.isAdmin = false;
  state.userRole = "player";
  state.accountProvider = "local";
  document.getElementById("avatarBtn").textContent = "SB";
  toast("Welcome back to Arena Elite!","success");
  switchView("home");
});

document.querySelectorAll(".auth-provider").forEach(button=>{
  button.addEventListener("click", ()=>{
    state.loggedIn = true;
    state.isAdmin = false;
    state.userRole = "player";
    state.accountProvider = button.dataset.provider.toLowerCase();
    const initials = button.dataset.provider.slice(0,2).toUpperCase();
    document.getElementById("avatarBtn").textContent = initials;
    document.getElementById("avatarBtn").title = button.dataset.provider + " account";
    toast(button.dataset.provider + " demo account connected. Welcome to Arena Elite!", "success");
    switchView("home");
  });
});

document.getElementById("quickFillAdminBtn").addEventListener("click", ()=>{
  document.getElementById("adminGateEmail").value = "admin@arenaelite.gg";
  document.getElementById("adminGatePass").value = "Admin@123";
  toast("Demo credentials filled. Click Authenticate to continue.","info");
});
document.getElementById("adminLoginForm").addEventListener("submit", e=>{
  e.preventDefault();
  const email = document.getElementById("adminGateEmail").value.trim().toLowerCase();
  const pass = document.getElementById("adminGatePass").value;
  if(email === "admin@arenaelite.gg" && pass === "Admin@123"){
    state.isAdmin = true;
    state.userRole = "admin";
    document.getElementById("avatarBtn").textContent = "AV";
    document.getElementById("avatarBtn").title = "Super Administrator (Alex Vance)";
    logAudit("LOGIN", "Admin Session", "SuperAdmin authenticated via demo credentials");
    toast("Admin access granted. Welcome, "+state.adminUser.name+".", "success");
    switchView("admin");
  } else {
    toast("Access Denied: Invalid administrator credentials.","danger");
  }
});

document.querySelectorAll("[data-admin-provider]").forEach(button=>{
  button.addEventListener("click", ()=>{
    state.loggedIn = true;
    state.isAdmin = true;
    state.userRole = "admin";
    state.accountProvider = button.dataset.adminProvider.toLowerCase();
    document.getElementById("avatarBtn").textContent = "AD";
    document.getElementById("avatarBtn").title = button.dataset.adminProvider + " admin account";
    logAudit("LOGIN", "Admin Session", button.dataset.adminProvider + " demo provider authentication");
    toast(button.dataset.adminProvider + " admin demo account connected.", "success");
    switchView("admin");
  });
});

document.getElementById("adminLogoutBtn").addEventListener("click", ()=>{
  askConfirm("Sign out of Admin Portal?", "Return to standard public site view?", ()=>{
    state.isAdmin = false;
    state.userRole = "player";
    document.getElementById("avatarBtn").textContent = "SB";
    logAudit("LOGOUT", "Admin Session", "Terminated administrative session");
    toast("Signed out of Admin Control Center.","info");
    switchView("home");
  });
});

