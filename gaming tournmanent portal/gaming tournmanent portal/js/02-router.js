/* ======================================================================
   VIEW ROUTING
====================================================================== */
function switchView(name){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  const target = document.getElementById("view-"+name);
  if(target) target.classList.add("active");
  document.querySelectorAll(".navlink[data-view-link]").forEach(l=>{
    l.classList.toggle("active", l.dataset.viewLink===name);
  });
  window.scrollTo({top:0});
  closeMobilePanel();

  if(name==="live") startLiveSimulation(); else stopLiveSimulation();
  if(name==="home" || name==="player" || name==="login") setTimeout(animateCounters, 30);
  
  if(name==="admin"){
    if(!state.isAdmin){
      document.getElementById("adminGateWrap").style.display = "flex";
      document.getElementById("adminPortalWrap").style.display = "none";
    } else {
      document.getElementById("adminGateWrap").style.display = "none";
      document.getElementById("adminPortalWrap").style.display = "block";
      initAdminPortal();
    }
  }
  lucide.createIcons();
}

document.querySelectorAll("[data-view-link]").forEach(el=>{
  el.addEventListener("click", e=>{ e.preventDefault(); switchView(el.dataset.viewLink); });
});

const mobilePanel = document.getElementById("mobilePanel");
const mobileScrim = document.getElementById("mobileScrim");
function openMobilePanel(){ mobilePanel.classList.add("open"); mobileScrim.classList.add("open"); }
function closeMobilePanel(){ mobilePanel.classList.remove("open"); mobileScrim.classList.remove("open"); }
document.getElementById("hamburgerBtn").addEventListener("click", openMobilePanel);
document.getElementById("closeMobilePanel").addEventListener("click", closeMobilePanel);
mobileScrim.addEventListener("click", closeMobilePanel);

window.addEventListener("scroll", ()=>{
  document.getElementById("mainNav").classList.toggle("compact", window.scrollY>30);
});

function animateCounters(){
  document.querySelectorAll("[data-counter]").forEach(el=>{
    if(el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseInt(el.dataset.counter,10);
    const prefix = el.dataset.prefix||""; const suffix = el.dataset.suffix||"";
    let startTime=null;
    function step(ts){
      if(!startTime) startTime=ts;
      const p = Math.min((ts-startTime)/1100,1);
      const val = Math.floor(target*(1-Math.pow(1-p,3)));
      el.textContent = prefix + val.toLocaleString("en-IN") + suffix;
      if(p<1) requestAnimationFrame(step); else el.textContent = prefix+target.toLocaleString("en-IN")+suffix;
    }
    requestAnimationFrame(step);
  });
}

