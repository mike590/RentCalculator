var rooms = {}, rent = 2500, roomCount, roomCountEl, roomsDisplay;

window.onload = function(){
  roomsDisplay = document.querySelector("#rooms_display");
  roomCountEl = document.querySelector("#room_count");
  roomCount = parseInt(roomCountEl.value);
  addRooms(roomCount);
  roomCountEl.addEventListener("change", function(e){
    roomCount = parseInt(roomCountEl.value);
    clearRooms();
    addRooms(roomCount);
  });

}

function clearRooms(){
  var roomEls = roomsDisplay.children;
  var l = roomEls.length;
  for(var i=0; i<l; i++){
    roomEls[0].remove();
  }
  rooms = {};
}

function addRooms(count){
  for(var i=1; i<(count+1); i++){
    rooms[i] = {occupancy: 1};
  }
  for(var room in rooms){
    var temp = document.createElement("div");
    temp.className = "room";
    roomsDisplay.appendChild(temp);
    var svg = document.createElement("svg");
    var group = document.createElement("g");

  }
}



