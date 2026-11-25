/* ======================================================================
   STATE & CORE DATA
====================================================================== */
const state = {
  userRole: "player",
  isAdmin: false,
  adminUser: { name: "Alex Vance", email: "admin@arenaelite.gg", role: "Super Administrator", avatar: "AV" },
  loggedIn: false,
  accountProvider: "local",
  settings: {
    orgName: "Arena Elite Esports Federation",
    supportEmail: "admin@arenaelite.gg",
    disputeWindow: 30,
    minRoster: 5,
    require2fa: true,
    ipBind: true,
    autoFlagReports: true,
    maintenanceMode: false
  },
  tournaments: [
    {id:1,name:"Valorant Champions Cup",game:"Valorant",code:"VL",platform:"PC",type:"Single Elimination",skill:"Professional",status:"live",prize:1200000,participants:64,teams:64,start:"2026-08-28",location:"Online",organizer:"Arena Elite Official",fee:"paid",desc:"The premier Valorant championship of Season 6."},
    {id:2,name:"CS2 Masters",game:"CS2",code:"C2",platform:"PC",type:"Double Elimination",skill:"Professional",status:"open",prize:850000,participants:32,teams:32,start:"2026-09-14",location:"Online",organizer:"Titan League",fee:"paid",desc:"A double-elimination invitational for the region's strongest CS2 rosters."},
    {id:3,name:"PUBG Battleground Series",game:"PUBG",code:"PB",platform:"Mobile",type:"League Format",skill:"Semi-Pro",status:"open",prize:600000,participants:48,teams:48,start:"2026-09-05",location:"LAN",organizer:"Battleground Circuit",fee:"free",desc:"A LAN-based league running across six weeks in Hyderabad."},
    {id:4,name:"FIFA Pro League",game:"FIFA",code:"FI",platform:"Console",type:"Round Robin",skill:"Amateur",status:"upcoming",prize:300000,participants:128,teams:128,start:"2026-09-20",location:"Online",organizer:"Pro League Network",fee:"free",desc:"An open round-robin league for solo competitors."},
    {id:5,name:"Free Fire Elite League",game:"Free Fire",code:"FF",platform:"Mobile",type:"League Format",skill:"Professional",status:"finished",prize:500000,participants:40,teams:40,start:"2026-07-10",location:"Online",organizer:"Elite League Studios",fee:"paid",desc:"Season 5's mobile flagship event."},
    {id:6,name:"Mobile Legends Championship",game:"Mobile Legends",code:"ML",platform:"Mobile",type:"Single Elimination",skill:"Semi-Pro",status:"live",prize:450000,participants:24,teams:24,start:"2026-08-30",location:"Online",organizer:"Arena Elite Official",fee:"free",desc:"Single-elimination cup for rising Mobile Legends rosters."}
  ],
  matches: {
    today: [
      {t:"10:00 AM",a:"Shadow Titans",b:"Phoenix Squad",game:"Valorant",num:"M-114",venue:"Online",status:"live",scoreA:13,scoreB:10,referee:"Sarah Connor"},
      {t:"12:30 PM",a:"Night Wolves",b:"Apex Legends",game:"CS2",num:"M-115",venue:"Online",status:"upcoming",scoreA:0,scoreB:0,referee:"Marcus Bell"},
      {t:"3:00 PM",a:"Titan Force",b:"Cyber Knights",game:"PUBG",num:"M-116",venue:"Hyderabad LAN",status:"upcoming",scoreA:0,scoreB:0,referee:"Sarah Connor"}
    ],
    tomorrow: [
      {t:"11:00 AM",a:"Iron Reapers",b:"Storm Breakers",game:"Valorant",num:"M-117",venue:"Online",status:"upcoming",scoreA:0,scoreB:0,referee:"Alex Vance"},
      {t:"2:00 PM",a:"Phoenix Squad",b:"Night Wolves",game:"CS2",num:"M-118",venue:"Online",status:"upcoming",scoreA:0,scoreB:0,referee:"Marcus Bell"}
    ],
    week: [
      {t:"Thu · 4:00 PM",a:"Shadow Titans",b:"Iron Reapers",game:"Valorant",num:"M-121",venue:"Online",status:"upcoming",scoreA:0,scoreB:0,referee:"Sarah Connor"}
    ],
    completed: [
      {t:"Mon · 5:00 PM",a:"Phoenix Squad",b:"Iron Reapers",game:"Valorant",num:"M-108",venue:"Online",status:"completed",score:"13–7",scoreA:13,scoreB:7,referee:"Sarah Connor"}
    ]
  },
  leaderboard: [
    {rank:1,team:"Storm Breakers",game:"Free Fire",matches:92,wins:71,losses:21,points:2840,move:3,status:"Active"},
    {rank:2,team:"Shadow Titans",game:"Valorant",matches:86,wins:58,losses:28,points:2615,move:1,status:"Active"},
    {rank:3,team:"Phoenix Squad",game:"Valorant",matches:88,wins:56,losses:32,points:2490,move:-1,status:"Active"},
    {rank:4,team:"Titan Force",game:"PUBG",matches:79,wins:49,losses:30,points:2310,move:0,status:"Active"},
    {rank:5,team:"Night Wolves",game:"CS2",matches:81,wins:47,losses:34,points:2185,move:2,status:"Active"},
    {rank:6,team:"Cyber Knights",game:"PUBG",matches:74,wins:42,losses:32,points:2040,move:-2,status:"Active"},
    {rank:7,team:"Apex Legends",game:"CS2",matches:70,wins:38,losses:32,points:1890,move:1,status:"Active"},
    {rank:8,team:"Iron Reapers",game:"Valorant",matches:68,wins:33,losses:35,points:1705,move:-1,status:"Active"}
  ],
  roster: [
    {name:"ShadowByte",role:"Duelist",captain:true},
    {name:"NightVortex",role:"Controller",captain:false},
    {name:"EchoPulse",role:"Initiator",captain:false},
    {name:"GraniteWall",role:"Sentinel",captain:false},
    {name:"QuietFrost",role:"Substitute",captain:false}
  ],
  players: [
    {id:1,name:"Shaurya Bhardwaj",username:"ShadowByte",email:"shadowbyte@titans.gg",team:"Shadow Titans",game:"Valorant",matches:124,wins:78,status:"Verified",joined:"Nov 12, 2025",kda:"1.42",earnings:240000},
    {id:2,name:"Vikramaditya Roy",username:"NightVortex",email:"vortex@breakers.gg",team:"Storm Breakers",game:"CS2",matches:110,wins:72,status:"Verified",joined:"Dec 04, 2025",kda:"1.28",earnings:185000},
    {id:3,name:"Ananya Deshmukh",username:"EchoPulse",email:"ananya@titans.gg",team:"Shadow Titans",game:"Valorant",matches:96,wins:61,status:"Active",joined:"Jan 15, 2026",kda:"1.19",earnings:90000},
    {id:4,name:"Rohan Sengupta",username:"GraniteWall",email:"rohan@phoenix.gg",team:"Phoenix Squad",game:"Valorant",matches:88,wins:52,status:"Active",joined:"Feb 01, 2026",kda:"1.05",earnings:65000},
    {id:5,name:"Karan Oberoi",username:"PhantomAim",email:"karan@apex.gg",team:"Apex Legends",game:"CS2",matches:74,wins:39,status:"Suspended",joined:"Feb 18, 2026",kda:"1.62",earnings:40000},
    {id:6,name:"Deepak Patel",username:"VortexKing",email:"deepak@wolves.gg",team:"Night Wolves",game:"CS2",matches:82,wins:48,status:"Active",joined:"Mar 02, 2026",kda:"0.98",earnings:30000},
    {id:7,name:"Simran Kaur",username:"Valkyrie99",email:"simran@reapers.gg",team:"Iron Reapers",game:"Valorant",matches:65,wins:33,status:"Active",joined:"Apr 10, 2026",kda:"1.14",earnings:25000}
  ],
  teams: [
    {id:1,name:"Shadow Titans",tag:"ST",captain:"ShadowByte",game:"Valorant",members:5,tournaments:14,wins:58,ranking:"#2 Global",status:"Active",region:"North Region"},
    {id:2,name:"Storm Breakers",tag:"SB",captain:"NightVortex",game:"Free Fire",members:5,tournaments:16,wins:71,ranking:"#1 Global",status:"Active",region:"West Region"},
    {id:3,name:"Phoenix Squad",tag:"PS",captain:"GraniteWall",game:"Valorant",members:5,tournaments:15,wins:56,ranking:"#3 Global",status:"Active",region:"South Region"},
    {id:4,name:"Titan Force",tag:"TF",captain:"RaptorX",game:"PUBG",members:4,tournaments:12,wins:49,ranking:"#4 Global",status:"Active",region:"North Region"},
    {id:5,name:"Night Wolves",tag:"NW",captain:"VortexKing",game:"CS2",members:5,tournaments:13,wins:47,ranking:"#5 Global",status:"Active",region:"East Region"},
    {id:6,name:"Cyber Knights",tag:"CK",captain:"ZeroByte",game:"PUBG",members:4,tournaments:11,wins:42,ranking:"#6 Global",status:"Active",region:"South Region"},
    {id:7,name:"Apex Legends",tag:"AL",captain:"PhantomAim",game:"CS2",members:5,tournaments:10,wins:38,ranking:"#7 Global",status:"Suspended",region:"West Region"},
    {id:8,name:"Iron Reapers",tag:"IR",captain:"Valkyrie99",game:"Valorant",members:5,tournaments:9,wins:33,ranking:"#8 Global",status:"Active",region:"North Region"}
  ],
  registrations: [
    {id:"REG-1041",team:"Quiet Riot",tournament:"PUBG Battleground Series",captain:"SniperWolf",game:"PUBG",players:4,submitted:"Aug 25, 2026",status:"approved"},
    {id:"REG-1042",team:"Iron Reapers",tournament:"CS2 Masters",captain:"Valkyrie99",game:"CS2",players:5,submitted:"Aug 27, 2026",status:"pending"},
    {id:"REG-1043",team:"Storm Breakers",tournament:"CS2 Masters",captain:"NightVortex",game:"CS2",players:5,submitted:"Aug 26, 2026",status:"pending"},
    {id:"REG-1044",team:"Velvet Wolves",tournament:"CS2 Masters",captain:"AlphaGrey",game:"CS2",players:5,submitted:"Aug 24, 2026",status:"rejected"},
    {id:"REG-1045",team:"Phantom Brigade",tournament:"Valorant Champions Cup",captain:"GhostRider",game:"Valorant",players:5,submitted:"Aug 29, 2026",status:"flagged"}
  ],
  reports: [
    {id:"REP-801",reporter:"QuietFrost",target:"PhantomAim",category:"Cheating",desc:"Suspected wallhack in map 2 overtime.",priority:"Critical",date:"Sep 7, 2026",status:"Open"},
    {id:"REP-802",reporter:"Storm Breakers",target:"Night Wolves",category:"Fake Result",desc:"Incorrect score screenshot uploaded.",priority:"High",date:"Sep 6, 2026",status:"In Review"},
    {id:"REP-803",reporter:"Apex Legends",target:"ViperStrike",category:"Abuse",desc:"Toxic verbal harassment in chat.",priority:"Medium",date:"Sep 6, 2026",status:"Resolved"},
    {id:"REP-804",reporter:"Iron Reapers",target:"PUBG Server",category:"Tournament Issue",desc:"Lobby disconnect dropped roster.",priority:"High",date:"Sep 5, 2026",status:"Open"}
  ],
  announcements: [
    {id:1,title:"Anti-Cheat Engine Update v4.2 Deployed",category:"System",audience:"All Players",priority:"Critical",date:"Sep 6, 2026",author:"Alex Vance",status:"Published",body:"Client-side integrity checks active across all match servers."},
    {id:2,title:"Season 6 Mid-Year Bracket Adjustments",category:"Tournament",audience:"Team Captains",priority:"Important",date:"Sep 4, 2026",author:"Alex Vance",status:"Published",body:"Quarterfinal seeding rules updated for round-robin play."}
  ],
  auditLogs: [
    {time:"2 mins ago",admin:"Alex Vance (SuperAdmin)",action:"APPROVE",target:"Registration: REG-1041",details:"Approved team participation",ip:"192.168.1.42",status:"Success"},
    {time:"24 mins ago",admin:"Alex Vance (SuperAdmin)",action:"UPDATE",target:"Match: M-114",details:"Updated live score to 13-10",ip:"192.168.1.42",status:"Success"},
    {time:"1 hour ago",admin:"Alex Vance (SuperAdmin)",action:"RESOLVE",target:"Report: REP-803",details:"Issued 48h chat restriction",ip:"192.168.1.42",status:"Success"},
    {time:"1 day ago",admin:"Alex Vance (SuperAdmin)",action:"LOGIN",target:"Admin Portal",details:"Authenticated via master credentials",ip:"192.168.1.42",status:"Success"}
  ],
  liveUpdates: [
    {type:"Match started",msg:"Shadow Titans vs Phoenix Squad is now live.",time:"12 min ago"},
    {type:"Tournament announcement",msg:"Quarterfinal seeding has been published.",time:"3 hr ago"}
  ],
  notifications: [
    {icon:"check-circle",text:"Your team has been approved for CS2 Masters.",time:"5 min ago"},
    {icon:"clock",text:"Shadow Titans vs Phoenix Squad starts in 30 minutes.",time:"22 min ago"}
  ],
  community: [
    {tag:"Announcement",author:"Arena Elite Official",body:"Quarterfinal seeding for the Valorant Champions Cup is now live.",likes:214,replies:38,reports:0,time:"2 hr ago",status:"Approved"},
    {tag:"Recruitment",author:"NightVortex",body:"Storm Breakers is looking for a stand-in Controller.",likes:41,replies:19,reports:0,time:"4 hr ago",status:"Approved"},
    {tag:"Discussion",author:"GraniteWall",body:"Does the new Ascension map favor defensive setups?",likes:88,replies:52,reports:0,time:"6 hr ago",status:"Approved"}
  ],
  activeTournamentId: 1,
  liveTimerSeconds: 18*60+42,
  liveInterval: null,
  pendingConfirm: null,
  discoveryFilters: {game:"all",platform:"all",type:"all",location:"all",status:"all",entry:[],q:""}
};

const money = n => "₹" + Number(n).toLocaleString("en-IN");
const shortCode = name => name.split(" ").map(w=>w[0]).join("").slice(0,3).toUpperCase();
const badgeInfo = s => ({
  live:{cls:"badge-live",label:"Live"},
  open:{cls:"badge-open",label:"Registration open"},
  finished:{cls:"badge-finished",label:"Finished"},
  upcoming:{cls:"badge-upcoming",label:"Upcoming"}
}[s] || {cls:"badge-upcoming",label:s});

function logAudit(action, target, details){
  state.auditLogs.unshift({
    time: "Just now",
    admin: state.adminUser.name + " (" + state.adminUser.role + ")",
    action: action, target: target, details: details,
    ip: "192.168.1.42 · Chrome", status: "Success"
  });
  if(document.getElementById("view-admin") && document.getElementById("view-admin").classList.contains("active")){
    renderAdminAuditLogs("all", "");
    renderDashAuditStream();
  }
}

function toast(msg, type = ""){
  const box = document.getElementById("toastContainer");
  const el = document.createElement("div");
  el.className = "toast " + type;
  el.innerHTML = '<i data-lucide="'+(type==="success"?"check-circle":type==="danger"?"alert-circle":"info")+'" class="icon"></i><span>'+msg+'</span>';
  box.appendChild(el);
  lucide.createIcons();
  setTimeout(()=>{ el.classList.add("out"); setTimeout(()=>el.remove(), 220); }, 3200);
}

function askConfirm(title, body, onConfirm){
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmBody").textContent = body;
  state.pendingConfirm = onConfirm;
  openOverlay("confirmOverlay");
}
document.getElementById("confirmOkBtn").addEventListener("click", ()=>{
  if(state.pendingConfirm) state.pendingConfirm();
  closeOverlay("confirmOverlay");
});
document.getElementById("confirmCancelBtn").addEventListener("click", ()=>closeOverlay("confirmOverlay"));

function openOverlay(id){ const el = document.getElementById(id); if(el){ el.classList.add("open"); document.body.classList.add("no-scroll"); } }
function closeOverlay(id){ const el = document.getElementById(id); if(el){ el.classList.remove("open"); document.body.classList.remove("no-scroll"); } }
document.querySelectorAll(".overlay").forEach(ov=>{ ov.addEventListener("click", e=>{ if(e.target===ov) closeOverlay(ov.id); }); });

