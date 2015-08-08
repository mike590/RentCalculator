var roomCount, roomCountEl, dash;
window.onload = function(){
  dash = document.querySelector("#dashboard");
  roomCountEl = document.querySelector("#room_count");
  roomCount = roomCountEl.value;
  roomCountEl.addEventListener("change", function(e){
    roomCount = roomCountEl.value;
    clearRooms();
    // addRooms(roomCount);
  });

}

function clearRooms(){}

function addRoom(){}

