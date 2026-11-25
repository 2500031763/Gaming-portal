/* ======================================================================
   ORGANIZER DASHBOARD
====================================================================== */
function renderOrgDashboard(){
  document.getElementById("orgp-dashboard").innerHTML = `
    <div class="admin-stat-grid" style="margin-bottom:20px">
      <div class="admin-stat-card"><div class="top"><span>Active Tournaments</span></div><div class="val">${state.tournaments.filter(t=>t.status==="live"||t.status==="open").length}</div></div>
      <div class="admin-stat-card"><div class="top"><span>Registered Players</span></div><div class="val">18,400</div></div>
      <div class="admin-stat-card"><div class="top"><span>Total Matches</span></div><div class="val">4,180</div></div>
      <div class="admin-stat-card"><div class="top"><span>Prize Distributed</span></div><div class="val">₹41L+</div></div>
    </div>`;
  renderRegistrations();
}
function renderRegistrations(){
  document.getElementById("orgp-registrations").innerHTML = `
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Team</th><th>Tournament</th><th>Players</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>${state.registrations.map((r,i)=>`
        <tr>
          <td><b>${r.team}</b></td><td>${r.tournament}</td><td>${r.players}</td>
          <td><span class="badge ${r.status==='approved'?'badge-approved':'badge-pending'}">${r.status.toUpperCase()}</span></td>
          <td>${r.status==='pending'?`<button class="btn btn-secondary btn-xs" onclick="approveReg(${i})">Approve</button>`:'—'}</td>
        </tr>`).join("")}</tbody>
    </table></div>`;
}
function approveReg(i){
  state.registrations[i].status = "approved";
  logAudit("APPROVE", "Registration ("+state.registrations[i].team+")", "Organizer confirmed entry");
  renderRegistrations();
  if(state.isAdmin) renderAdminRegistrations("all");
  toast("Registration approved.","success");
}

document.getElementById("orgSide").addEventListener("click", e=>{
  const link = e.target.closest(".org-side-link"); if(!link) return;
  e.preventDefault();
  document.querySelectorAll(".org-side-link").forEach(l=>l.classList.remove("active"));
  link.classList.add("active");
  document.querySelectorAll("[data-orgpanel]").forEach(p=>p.style.display="none");
  document.getElementById("orgp-"+link.dataset.org).style.display="block";
});

