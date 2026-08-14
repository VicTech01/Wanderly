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
    });

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
