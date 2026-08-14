/* =============================================================================
   Wanderly — app.js  (vanilla JS, no dependencies)
   Modules: data · ui(nav/toast) · render(detail/booking) · booking(logic) · init
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- data ---------- */
  var STAYS = [
    { id:"beach",   name:"Azure Overwater Villas", loc:"Malé, Maldives",   img:"images/hero.jpg",       price:420, rating:4.97, reviews:284, badge:"Guest favourite", type:"Beach" },
    { id:"mountain",name:"Pinecrest A-Frame Cabin", loc:"Aspen, Colorado",  img:"images/mountain.jpg",   price:190, rating:4.89, reviews:156, badge:"Cabin",           type:"Cabin" },
    { id:"city",    name:"Caldera Blue Suites",     loc:"Santorini, Greece",img:"images/city.jpg",       price:265, rating:4.92, reviews:203, badge:"Sea view",        type:"City" },
    { id:"safari",  name:"Savanna Luxury Lodge",    loc:"Maasai Mara, Kenya",img:"images/safari.jpg",    price:310, rating:4.95, reviews:127, badge:"Safari",          type:"Nature" },
    { id:"beachhouse",name:"Palmview Infinity Villa",loc:"Bali, Indonesia", img:"images/beachhouse.jpg", price:280, rating:4.90, reviews:198, badge:"Pool",            type:"Beach" },
    { id:"room",    name:"The Nordic Loft",         loc:"Copenhagen, Denmark",img:"images/room.jpg",     price:145, rating:4.85, reviews:311, badge:"Central",         type:"City" }
  ];
  var byId = function (id) { return STAYS.filter(function (s){ return s.id===id; })[0]; };

  var state = { current:"beach", guests:2, nights:5, fav:{} };

  /* ---------- ui ---------- */
  var ui = {
    go:function(id){
      document.querySelectorAll(".screen").forEach(function(s){ s.classList.toggle("is-active", s.id==="s-"+id); });
      document.querySelectorAll(".nav-item").forEach(function(n){
        var on=n.dataset.go===id; n.classList.toggle("is-active",on); n.setAttribute("aria-current",on?"page":"false");
      });
      var el=document.getElementById("s-"+id); if(el) el.scrollTop=0;
    },
    toast:function(msg){
      var t=document.getElementById("toast"); t.querySelector(".toast-msg").textContent=msg;
      t.classList.add("is-visible"); clearTimeout(ui._t); ui._t=setTimeout(function(){t.classList.remove("is-visible");},2400);
    }
  };

  /* ---------- render ---------- */
  var render = {
    detail:function(id){
      var s=byId(id); if(!s) return; state.current=id;
      document.getElementById("dImg").src=s.img;
      document.getElementById("dName").textContent=s.name;
      document.getElementById("dLoc").textContent=s.loc;
      document.getElementById("dRating").textContent=s.rating.toFixed(2);
      document.getElementById("dReviews").textContent="("+s.reviews+" reviews)";
      document.getElementById("dPrice").textContent="$"+s.price;
      document.getElementById("dHostLetter").textContent=s.name.charAt(0);
    },
    booking:function(){
      var s=byId(state.current);
      document.getElementById("bImg").src=s.img;
      document.getElementById("bName").textContent=s.name;
      document.getElementById("bLoc").textContent=s.loc;
      document.getElementById("bGuests").textContent=state.guests;
      document.getElementById("bGuestsN").textContent=state.guests;
      document.getElementById("bNights").textContent=state.nights+(state.nights>1?" nights":" night");
      document.getElementById("bNightsN").textContent=state.nights;
      var sub=s.price*state.nights, fee=Math.round(sub*0.12), clean=45, total=sub+fee+clean;
      document.getElementById("bLineNights").textContent="$"+s.price+" × "+state.nights+(state.nights>1?" nights":" night");
      document.getElementById("bSub").textContent="$"+sub.toLocaleString();
      document.getElementById("bFee").textContent="$"+fee;
      document.getElementById("bTotal").textContent="$"+total.toLocaleString();
      document.getElementById("bTotal2").textContent="$"+total.toLocaleString();
    }
  };

  /* ---------- bottom sheet ---------- */
  var CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  var SHEETS = {
    personal: {
      title: "Personal information",
      body: function(){
        return '<div class="s-field"><label>Full name</label><input type="text" value="John Doe"></div>'
          + '<div class="s-field"><label>Email</label><input type="email" value="johndoe@email.com"></div>'
          + '<div class="s-field"><label>Phone</label><input type="tel" value="+1 555 010 2030"></div>'
          + '<div class="s-field"><label>Home city</label><input type="text" value="San Francisco, USA"></div>'
          + '<div class="sheet-actions"><button class="sheet-btn ghost" data-close>Cancel</button><button class="sheet-btn primary" data-save="Profile updated">Save changes</button></div>';
      }
    },
    payments: {
      title: "Payment methods",
      body: function(){
        return '<div class="pay-row"><span class="pr-brand visa">VISA</span><span><b>Visa ·· 4242</b><small>Expires 08/28</small></span><span class="pr-tag">Default</span></div>'
          + '<div class="pay-row"><span class="pr-brand mc">MC</span><span><b>Mastercard ·· 8810</b><small>Expires 11/27</small></span></div>'
          + '<div class="pay-row"><span class="pr-brand mp">M-PESA</span><span><b>Mobile money</b><small>Linked</small></span></div>'
          + '<div class="sheet-actions"><button class="sheet-btn primary" data-save="Card added (demo)">Add new card</button></div>';
      }
    },
    notifications: {
      title: "Notifications",
      body: function(){
        return '<div class="opt-row"><span><b>Trip updates</b><small>Check-in, itinerary & changes</small></span><button class="switch" role="switch" aria-checked="true" aria-label="Trip updates"></button></div>'
          + '<div class="opt-row"><span><b>Deals & offers</b><small>Price drops on saved stays</small></span><button class="switch" role="switch" aria-checked="true" aria-label="Deals and offers"></button></div>'
          + '<div class="opt-row"><span><b>Messages</b><small>Host replies & requests</small></span><button class="switch" role="switch" aria-checked="true" aria-label="Messages"></button></div>'
          + '<div class="opt-row"><span><b>Marketing emails</b><small>Inspiration & newsletters</small></span><button class="switch" role="switch" aria-checked="false" aria-label="Marketing emails"></button></div>';
      }
    },
    language: {
      title: "Language & currency",
      body: function(){
        return '<div class="section-head" style="padding:4px 2px"><div class="sec-title" style="font-size:14px">Language</div></div>'
          + '<button class="choice-row is-selected" data-choice="lang"><span><b>English</b><small>United States</small></span><span class="check">'+CHECK_SVG+'</span></button>'
          + '<button class="choice-row" data-choice="lang"><span><b>Kiswahili</b><small>Kenya</small></span><span class="check">'+CHECK_SVG+'</span></button>'
          + '<button class="choice-row" data-choice="lang"><span><b>Français</b><small>France</small></span><span class="check">'+CHECK_SVG+'</span></button>'
          + '<div class="section-head" style="padding:12px 2px 4px"><div class="sec-title" style="font-size:14px">Currency</div></div>'
          + '<button class="choice-row is-selected" data-choice="cur"><span><b>USD — $</b><small>US dollar</small></span><span class="check">'+CHECK_SVG+'</span></button>'
          + '<button class="choice-row" data-choice="cur"><span><b>KES — KSh</b><small>Kenyan shilling</small></span><span class="check">'+CHECK_SVG+'</span></button>'
          + '<button class="choice-row" data-choice="cur"><span><b>EUR — €</b><small>Euro</small></span><span class="check">'+CHECK_SVG+'</span></button>';
      }
    },
    logout: {
      title: "Log out?",
      body: function(){
        return '<p style="color:var(--muted);font-size:14px;line-height:1.55;margin:2px 0 16px">You\'ll need to sign back in to see your trips, wishlists and messages.</p>'
          + '<div class="sheet-actions"><button class="sheet-btn ghost" data-close>Cancel</button><button class="sheet-btn danger" data-save="Logged out (demo)">Log out</button></div>';
      }
    }
  };

  var sheet = {
    _last:null,
    open:function(name){
      var def=SHEETS[name]; if(!def) return;
      sheet._last=document.activeElement;
      document.getElementById("sheetTitle").textContent=def.title;
      document.getElementById("sheetBody").innerHTML=def.body();
      var bd=document.getElementById("sheetBackdrop"), sh=document.getElementById("sheet");
      bd.hidden=false; sh.hidden=false;
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ bd.classList.add("is-open"); sh.classList.add("is-open"); }); });
      document.getElementById("sheetClose").focus();
    },
    close:function(){
      var bd=document.getElementById("sheetBackdrop"), sh=document.getElementById("sheet");
      bd.classList.remove("is-open"); sh.classList.remove("is-open");
      setTimeout(function(){ bd.hidden=true; sh.hidden=true; },300);
      if(sheet._last && sheet._last.focus) sheet._last.focus();
    }
  };

  /* ---------- booking logic ---------- */
  var booking = {
    open:function(){ render.booking(); validate(); ui.go("booking"); },
    guests:function(delta){ state.guests=Math.min(12,Math.max(1,state.guests+delta)); render.booking(); },
    nights:function(delta){ state.nights=Math.min(30,Math.max(1,state.nights+delta)); render.booking(); }
  };
  function validate(){
    var ok=state.guests>=1 && state.nights>=1;
    document.getElementById("confirmBtn").disabled=!ok;
    return ok;
  }

  /* ---------- init ---------- */
  function init(){
    // global nav
    document.addEventListener("click",function(e){
      var g=e.target.closest("[data-go]"); if(g){ ui.go(g.dataset.go); }
      var open=e.target.closest("[data-stay]"); if(open){ render.detail(open.dataset.stay); ui.go("detail"); }
      var fav=e.target.closest("[data-fav]"); if(fav){ fav.classList.toggle("on"); ui.toast(fav.classList.contains("on")?"Saved to wishlist":"Removed"); e.stopPropagation(); }

      // profile bottom sheets
      var sh=e.target.closest("[data-sheet]"); if(sh){ sheet.open(sh.dataset.sheet); }
      if(e.target.closest("[data-close]") || e.target.id==="sheetBackdrop" || e.target.closest("#sheetClose")){ sheet.close(); }
      var save=e.target.closest("[data-save]"); if(save){ ui.toast(save.dataset.save); sheet.close(); }
      // toggle switches
      var sw=e.target.closest(".switch"); if(sw){ sw.setAttribute("aria-checked", sw.getAttribute("aria-checked")==="true" ? "false" : "true"); }
      // single-select choice rows (language / currency groups)
      var ch=e.target.closest(".choice-row"); if(ch){
        document.querySelectorAll('.choice-row[data-choice="'+ch.dataset.choice+'"]').forEach(function(x){ x.classList.remove("is-selected"); });
        ch.classList.add("is-selected"); ui.toast("Preference updated");
      }
    });
    // esc closes sheet
    document.addEventListener("keydown",function(e){ if(e.key==="Escape") sheet.close(); });

    // category chips
    document.querySelectorAll(".cat").forEach(function(c){
      c.addEventListener("click",function(){ document.querySelectorAll(".cat").forEach(function(x){x.classList.remove("is-active");}); c.classList.add("is-active"); });
    });
    // trips tabs
    document.querySelectorAll(".tab").forEach(function(t){
      t.addEventListener("click",function(){
        document.querySelectorAll(".tab").forEach(function(x){x.classList.remove("is-active");}); t.classList.add("is-active");
        var up=t.dataset.tab==="upcoming";
        document.getElementById("tripsUpcoming").classList.toggle("hidden",!up);
        document.getElementById("tripsPast").classList.toggle("hidden",up);
      });
    });

    // reserve → booking
    document.getElementById("reserveBtn").addEventListener("click",booking.open);
    // steppers
    document.getElementById("gPlus").addEventListener("click",function(){booking.guests(1);});
    document.getElementById("gMinus").addEventListener("click",function(){booking.guests(-1);});
    document.getElementById("nPlus").addEventListener("click",function(){booking.nights(1);});
    document.getElementById("nMinus").addEventListener("click",function(){booking.nights(-1);});
    // confirm
    document.getElementById("confirmBtn").addEventListener("click",function(){
      if(!validate()) return;
      ui.toast("Booking confirmed! 🎉");
      setTimeout(function(){ ui.go("trips"); },700);
    });

    render.detail("beach");
    render.booking();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
})();
