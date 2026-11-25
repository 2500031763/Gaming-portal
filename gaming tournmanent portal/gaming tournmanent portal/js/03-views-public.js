/* ======================================================================
   PUBLIC VIEWS IMPLEMENTATION
====================================================================== */
function tournamentCard(t){
  const b = badgeInfo(t.status);
  return `<div class="t-card">
    <div class="t-card-top">
      <div class="t-emblem-row"><div class="t-emblem">${t.code}</div><div><div class="t-game">${t.game}</div><h3><a href="#" data-open-tournament="${t.id}">${t.name}</a></h3></div></div>
      <span class="badge ${b.cls}"><span class="bdot"></span>${b.label}</span>
    </div>
    <div class="t-meta">
      <div class="t-meta-item"><i data-lucide="calendar" class="icon"></i>${formatDate(t.start)}</div>
      <div class="t-meta-item"><i data-lucide="map-pin" class="icon"></i>${t.location}</div>
      <div class="t-meta-item"><i data-lucide="users" class="icon"></i><b>${t.teams}</b> teams</div>
      <div class="t-meta-item"><i data-lucide="swords" class="icon"></i>${t.type}</div>
    </div>
    <div class="t-card-foot">
      <div class="t-prize">${money(t.prize)}<span>Prize pool</span></div>
      <button class="btn btn-secondary btn-sm" data-open-tournament="${t.id}">View tournament</button>
    </div>
  </div>`;
}
function formatDate(iso){ return new Date(iso+"T00:00:00").toLocaleDateString("en-IN",{month:"short",day:"numeric",year:"numeric"}); }

function renderHomeGrid(filter = "all"){
  const list = state.tournaments.filter(t=> filter==="all" || t.status===filter);
  document.getElementById("homeTournamentGrid").innerHTML = list.map(tournamentCard).join("");
  lucide.createIcons();
}
document.getElementById("homeFilterChips").addEventListener("click", e=>{
  const chip = e.target.closest(".chip"); if(!chip) return;
  document.querySelectorAll("#homeFilterChips .chip").forEach(c=>c.classList.remove("active"));
  chip.classList.add("active");
  renderHomeGrid(chip.dataset.status);
});

function renderDiscovery(){
  const f = state.discoveryFilters;
  const list = state.tournaments.filter(t=>{
    if(f.game!=="all" && t.game!==f.game) return false;
    if(f.platform!=="all" && t.platform!==f.platform) return false;
    if(f.type!=="all" && t.type!==f.type) return false;
    if(f.location!=="all" && t.location!==f.location) return false;
    if(f.status!=="all" && t.status!==f.status) return false;
    if(f.entry.length && !f.entry.includes(t.fee)) return false;
    if(f.q && !t.name.toLowerCase().includes(f.q.toLowerCase())) return false;
    return true;
  });
  document.getElementById("discoveryGrid").innerHTML = list.map(tournamentCard).join("") || '<p style="color:var(--text-faint);padding:30px">No tournaments found.</p>';
  document.getElementById("discoveryCount").textContent = list.length + " tournaments found";
  lucide.createIcons();
}
["fGame","fPlatform","fType","fLocation","fStatus"].forEach(id=>{
  document.getElementById(id).addEventListener("change", e=>{
    const map = {fGame:"game",fPlatform:"platform",fType:"type",fLocation:"location",fStatus:"status"};
    state.discoveryFilters[map[id]] = e.target.value;
    renderDiscovery();
  });
});
document.getElementById("discoverySearch").addEventListener("input", e=>{ state.discoveryFilters.q = e.target.value; renderDiscovery(); });
document.getElementById("clearFiltersBtn").addEventListener("click", ()=>{
  state.discoveryFilters = {game:"all",platform:"all",type:"all",location:"all",status:"all",entry:[],q:""};
  ["fGame","fPlatform","fType","fLocation","fStatus"].forEach(id=>document.getElementById(id).value="all");
  document.getElementById("discoverySearch").value="";
  renderDiscovery();
});

document.addEventListener("click", e=>{
  const op = e.target.closest("[data-open-tournament]");
  if(op){ e.preventDefault(); openTournament(parseInt(op.dataset.openTournament,10)); }
});

function openTournament(id){
  state.activeTournamentId = id;
  const t = state.tournaments.find(x=>x.id===id);
  if(!t) return;
  const b = badgeInfo(t.status);
  document.getElementById("tHeaderBox").innerHTML = `
    <div class="t-header-left">
      <div class="t-header-emblem">${t.code}</div>
      <div>
        <h1>${t.name}</h1>
        <p style="color:var(--text-muted);font-size:13px">Organized by ${t.organizer}</p>
        <div style="margin-top:10px"><span class="badge ${b.cls}"><span class="bdot"></span>${b.label}</span></div>
        <div class="t-header-stats">
          <div><span style="font-size:11.5px;color:var(--text-faint)">Prize pool</span><b>${money(t.prize)}</b></div>
          <div><span style="font-size:11.5px;color:var(--text-faint)">Slots</span><b>${t.teams} teams</b></div>
          <div><span style="font-size:11.5px;color:var(--text-faint)">Date</span><b>${formatDate(t.start)}</b></div>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:10px;align-items:flex-start">
      <button class="btn btn-primary" id="registerNowBtn"><i data-lucide="clipboard-check"></i><span>Register</span></button>
      <button class="btn btn-secondary" id="shareTournamentBtn"><i data-lucide="share-2"></i><span>Share</span></button>
    </div>`;

  document.getElementById("tp-overview").innerHTML = `<div class="panel"><h4>About Tournament</h4><p style="color:var(--text-muted);margin-top:8px">${t.desc}</p></div>`;
  document.getElementById("tp-schedule").innerHTML = `<div class="panel"><h4>Tournament schedule</h4><div class="roster-row"><b>Group Stage</b><span>Sep 1–7</span></div><div class="roster-row"><b>Playoffs</b><span>Sep 9–13</span></div></div>`;
  document.getElementById("tp-bracket").innerHTML = bracketHTML();
  document.getElementById("tp-teams").innerHTML = `<div class="grid-cards">${state.teams.map(tm=>`<div class="t-card"><b>${tm.name}</b><span style="font-size:12px;color:var(--text-faint)">Captain: ${tm.captain}</span></div>`).join("")}</div>`;
  document.getElementById("tp-matches").innerHTML = renderMatchListHTML(state.matches.today);
  document.getElementById("tp-leaderboard").innerHTML = `<div class="lb-table-wrap"><table class="lb-table">${leaderboardTableHTML(state.leaderboard)}</table></div>`;
  document.getElementById("tp-rules").innerHTML = `<div class="panel"><h4>Rules</h4><p style="color:var(--text-muted);margin-top:8px">All registered players must adhere to anti-cheat guidelines.</p></div>`;
  document.getElementById("tp-prizes").innerHTML = prizeSectionHTML(t.prize);

  document.querySelectorAll(".tabbtn[data-ttab]").forEach(x=>x.classList.remove("active"));
  document.querySelector('.tabbtn[data-ttab="overview"]').classList.add("active");
  document.querySelectorAll(".tabpanel[data-tpanel]").forEach(p=>p.classList.remove("active"));
  document.getElementById("tp-overview").classList.add("active");

  switchView("tournament");
  document.getElementById("registerNowBtn").addEventListener("click", ()=>openOverlay("registerTOverlay"));
  document.getElementById("shareTournamentBtn").addEventListener("click", ()=>toast("Tournament link copied.","success"));
}

document.getElementById("tTabs").addEventListener("click", e=>{
  const b = e.target.closest(".tabbtn"); if(!b) return;
  document.querySelectorAll("#tTabs .tabbtn").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
  document.querySelectorAll(".tabpanel[data-tpanel]").forEach(p=>p.classList.remove("active"));
  document.getElementById("tp-"+b.dataset.ttab).classList.add("active");
});

function bracketHTML(){
  return `<div class="panel"><h4>Playoff bracket</h4><div class="bracket-scroll"><div class="bracket">
    <div class="bracket-col"><div class="bracket-col-title">Semifinals</div><div class="bmatch"><div class="bteam winner">Shadow Titans <span class="bscore">13</span></div><div class="bteam">Titan Force <span class="bscore">9</span></div></div></div>
    <div class="bracket-col"><div class="bracket-col-title">Grand Final</div><div class="bmatch"><div class="bteam">Shadow Titans <span class="bscore">—</span></div><div class="bteam">Storm Breakers <span class="bscore">—</span></div></div></div>
  </div></div></div>`;
}

function prizeSectionHTML(pool){
  return `<div style="text-align:center;padding:30px;background:var(--accent-soft);border-radius:var(--radius-md);margin-bottom:20px">
    <span class="eyebrow-label">Total Prize</span><div style="font-size:42px;font-family:var(--font-display);color:var(--accent)">${money(pool)}</div>
  </div>`;
}

function renderMatchListHTML(list){
  return list.map(m=>`
    <div class="match-row">
      <div class="match-time">${m.t}<span>${m.num}</span></div>
      <div><div class="match-teams">${m.a}<span style="color:var(--text-faint);margin:0 8px;font-weight:400">vs</span>${m.b}</div><div style="font-size:12px;color:var(--text-faint)">${m.game} · ${m.venue}</div></div>
      <div><span class="badge ${m.status==='live'?'badge-live':'badge-upcoming'}">${m.status.toUpperCase()}</span></div>
      <div><button class="btn btn-secondary btn-sm" onclick="switchView('live')">${m.status==='live'?'Watch Live':'Details'}</button></div>
    </div>`).join("");
}
function renderMatchesView(range){
  document.getElementById("matchScheduleList").innerHTML = renderMatchListHTML(state.matches[range] || state.matches.today);
  lucide.createIcons();
}
document.getElementById("matchFilterChips").addEventListener("click", e=>{
  const chip = e.target.closest(".chip"); if(!chip) return;
  document.querySelectorAll("#matchFilterChips .chip").forEach(c=>c.classList.remove("active"));
  chip.classList.add("active");
  renderMatchesView(chip.dataset.range);
});

function startLiveSimulation(){
  stopLiveSimulation();
  document.getElementById("liveStatTable").innerHTML = `<tr><td>ShadowByte</td><td>18</td><td>9</td><td>4</td><td>1.34</td></tr><tr><td>NightVortex</td><td>14</td><td>11</td><td>7</td><td>1.08</td></tr>`;
  document.getElementById("liveEventFeed").innerHTML = `<div class="event-item"><span style="color:var(--accent);font-weight:700">R23</span><span>Shadow Titans convert retake on site B.</span></div>`;
  state.liveInterval = setInterval(()=>{
    state.liveTimerSeconds++;
    const m = Math.floor(state.liveTimerSeconds/60), s = state.liveTimerSeconds%60;
    document.getElementById("liveTimer").textContent = String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  }, 2000);
}
function stopLiveSimulation(){ if(state.liveInterval){ clearInterval(state.liveInterval); state.liveInterval = null; } }

function leaderboardTableHTML(list){
  const rows = list.map(r=>`
    <tr>
      <td><b style="font-family:var(--font-display)">#${r.rank}</b></td>
      <td><b>${r.team}</b></td>
      <td>${r.matches}</td>
      <td>${r.wins}</td>
      <td>${r.losses}</td>
      <td><b style="color:var(--accent)">${r.points.toLocaleString("en-IN")}</b></td>
      <td>${Math.round((r.wins/r.matches)*100)}%</td>
      <td>${r.move>0?`<span class="move-up">+${r.move}</span>`:'—'}</td>
    </tr>`).join("");
  return `<thead><tr><th>Rank</th><th>Team</th><th>Matches</th><th>Wins</th><th>Losses</th><th>Points</th><th>Win Rate</th><th>Movement</th></tr></thead><tbody>${rows}</tbody>`;
}
function renderFullLeaderboard(){ document.getElementById("fullLbTable").innerHTML = leaderboardTableHTML(state.leaderboard); }
function renderHomeLeaderboard(){
  const table = document.getElementById("homeLbTable");
  if(table) table.innerHTML = leaderboardTableHTML(state.leaderboard.slice(0,5));
}

function renderRoster(){
  document.getElementById("rosterList").innerHTML = state.roster.map((p,i)=>`
    <div class="roster-row">
      <div class="roster-left"><div class="roster-avatar">${p.name.slice(0,2).toUpperCase()}</div><div><div class="roster-name">${p.name}${p.captain?'<span class="cap-tag">CAPTAIN</span>':''}</div><div style="font-size:12.5px;color:var(--text-faint)">${p.role}</div></div></div>
      <button class="btn btn-danger-line btn-xs" onclick="removeRosterPlayer(${i})"><i data-lucide="user-minus"></i></button>
    </div>`).join("");
  lucide.createIcons();
}
function removeRosterPlayer(i){
  askConfirm("Remove player?", "Remove from active roster?", ()=>{
    state.roster.splice(i,1); renderRoster(); toast("Player removed.","info");
  });
}
document.getElementById("addPlayerBtn").addEventListener("click", ()=>openOverlay("addPlayerOverlay"));
document.getElementById("addPlayerForm").addEventListener("submit", e=>{
  e.preventDefault();
  state.roster.push({name:document.getElementById("apName").value.trim(), role:document.getElementById("apRole").value, captain:false});
  renderRoster(); closeOverlay("addPlayerOverlay"); toast("Player added to roster.","success");
});

function renderCommunity(tag = "all"){
  const list = state.community.filter(c=> (tag==="all" || c.tag===tag) && c.status!=="Hidden");
  document.getElementById("communityFeed").innerHTML = list.map(c=>`
    <div class="feed-card">
      <div class="feed-top">
        <div class="feed-author"><div class="feed-avatar">${c.author.slice(0,2).toUpperCase()}</div><div><b>${c.author}</b><div style="font-size:12px;color:var(--text-faint)">${c.time}</div></div></div>
        <span class="badge badge-upcoming">${c.tag}</span>
      </div>
      <p style="margin-top:12px;color:var(--text-muted)">${c.body}</p>
      <div class="feed-foot"><span class="feed-action">❤️ ${c.likes} likes</span><span class="feed-action">💬 ${c.replies||0} replies</span></div>
    </div>`).join("");
  lucide.createIcons();
}
document.getElementById("communityFilters").addEventListener("click", e=>{
  const chip = e.target.closest(".chip"); if(!chip) return;
  document.querySelectorAll("#communityFilters .chip").forEach(c=>c.classList.remove("active"));
  chip.classList.add("active");
  renderCommunity(chip.dataset.ctag);
});
