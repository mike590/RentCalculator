var rooms = {}, baseline = 280, rent = 2500, rentEl, roomCount, roomCountEl, personCount, slider, roomPercentage, roomsDisplay, totalRoomCost, perPersonCost, perRoomCost, roomPercent, personPercent, roomCost, personCost;

window.onload = function(){
  rentEl = document.querySelector("#rent");
  roomsDisplay = document.querySelector("#rooms_display");
  roomCountEl = document.querySelector("#room_count");
  slider = document.querySelector("#split");
  roomCost = document.querySelector("#roomCost");
  personCost = document.querySelector("#personCost");
  roomPercent = document.querySelector("#roomPercent");
  personPercent = document.querySelector("#personPercent");
  roomCount = parseInt(roomCountEl.value);
  roomCostPercentage = parseInt(slider.value)/100;
  totalRoomCost = rent * roomCostPercentage;
  perRoomCost = totalRoomCost/roomCount;
  perPersonCost = rent - totalRoomCost;
  drawRooms(roomCount);

  roomCountEl.addEventListener("change", function(e){
    roomCount = parseInt(roomCountEl.value);
    drawRooms(roomCount);
  });

  rentEl.addEventListener("change", function(e){
    // change to keyDown or something and setTimeout here so it waits 1-2 seconds after changing
    rent = parseInt(rentEl.value);
    totalRoomCost = rent * roomCostPercentage;

    drawRooms(roomCount);
  });

  slider.addEventListener("change", function(e){
    // change to keyDown or something and setTimeout here so it waits 1-2 seconds after changing
    roomCostPercentage = parseInt(slider.value)/100;
    totalRoomCost = rent * roomCostPercentage;
    roomPercent.textContent = "%" + (roomCostPercentage*100).toFixed(2);
    roomCost.textContent = "$" + totalRoomCost.toFixed(2);
    personPercent.textContent = "%" + (100 - roomCostPercentage*100).toFixed(2);
    personCost.textContent = "$" + (rent - totalRoomCost).toFixed(2); 

    drawRooms(roomCount);
  });  

}

function drawRooms(count){
  var transformArr = [];
  var totalPeople = 0;
  
  // transform values for rooms will all be the same
  // calculate here
  perRoomCost = totalRoomCost/roomCount;
  var scaleMax = 280;
  var scaleRatio = rent/scaleMax
  var hRoomFinal = perRoomCost/scaleRatio;
  var yRoomFinal = baseline - hRoomFinal;

  // if roomCount selected is less than previous roomCount, prepare excess svg's 
  // to be subtracted
  for(var i=1; i<6; i++){

    if(i>roomCount){
      var roomGroup = document.querySelector("#room" + i);
      // prepare room svg
      var roomSVG = roomGroup.querySelector(".roomSVG");
      var hRoom = parseInt(roomSVG.getAttribute("height"));
      var yRoom = parseInt(roomSVG.getAttribute("y"));
      transformArr.push(prepare(roomSVG, hRoom, 0, yRoom, baseline))
      // prepare peerson svg's
      for(var p=1; p<4; p++){
        var tempEl = roomGroup.querySelector(".person" + p);
        var hPerson = parseInt(tempEl.getAttribute("height"));
        var yPerson = parseInt(tempEl.getAttribute("y"));
        transformArr.push(prepare(tempEl, hPerson, 0, yPerson, baseline))
      }
    }
  }
  // remove excess rooms from room object, and excess room elements
  for(var room in rooms){
    if(room > count-1){
      // remove textual stuff
      roomsDisplay.children[roomsDisplay.children.length - 1].remove();
      
      // delete room property form rooms object
      delete rooms[room];
    }
  }
  // Add up total occupancy, create new rooms (elements and in rooms object)
  // if rooms have been added
  for(var i=0; i<count; i++){
    if(!rooms.hasOwnProperty(i)){
      rooms[i] = {occupancy: 1};
      totalPeople++;
      // create div to hold info
      var div = document.createElement("div");
      div.className = "room";
      // create number input element with event listener to change occupancy for the room
      var occ = document.createElement("input");
      occ.id = i;
      occ.type = "number";
      occ.value = 1;
      occ.min = 1;
      occ.max = 3;
      occ.addEventListener("change", function(e){
        rooms[parseInt(this.id)]["occupancy"] = parseInt(this.value);

        drawRooms(roomCount);
      });
      div.appendChild(occ);
      // add it to the page
      roomsDisplay.appendChild(div);

    } else{
      totalPeople = totalPeople + rooms[i]["occupancy"];
    }
  }

  perPersonCost = (rent - totalRoomCost)/totalPeople;
  var hPersonFinal = perPersonCost/scaleRatio;
  var yPersonLowest = baseline - hRoomFinal - hPersonFinal;

  // remove all personCost/roomCost/totalCost elements in text part
  var removeEls = document.querySelectorAll(".personCost");
  while(removeEls[0]){
    removeEls[0].remove();
    var removeEls = document.querySelectorAll(".personCost");
  }
  removeEls = document.querySelectorAll(".roomCost");
  while(removeEls[0]){
    removeEls[0].remove();
    var removeEls = document.querySelectorAll(".roomCost");
  }
  removeEls = document.querySelectorAll(".totalCost");
  while(removeEls[0]){
    removeEls[0].remove();
    var removeEls = document.querySelectorAll(".totalCost");
  }
// 
  // iterate over rooms, correcting amount of person elements and adding total costs
  for(var room in rooms){
    
    // prepare objects and push into transformArr
    var roomGroup = document.querySelector("#room" + (parseInt(room)+1));

    // prepare roomSVG for transformation
    var roomSVG = roomGroup.querySelector(".roomSVG");
    var h = parseInt(roomSVG.getAttribute("height"));
    var y = parseInt(roomSVG.getAttribute("y"));
    transformArr.push(prepare(roomSVG, h, hRoomFinal, y, yRoomFinal))

    // prepare person SVG's for transformation
    var people = rooms[room]["occupancy"];
    for(var i=1; i<4; i++){
        // subtract people if they are above the occupancy
        if(i>people){
          var tempEl = roomGroup.querySelector(".person" + (i));
          var hPerson = parseInt(tempEl.getAttribute("height"));
          var yPerson = parseInt(tempEl.getAttribute("y"));
          transformArr.push(prepare(tempEl, hPerson, 0, yPerson, baseline))

        // fix the size of person SVG's which remain or are added
        } else{
          var tempEl = roomGroup.querySelector(".person" + (i));
          var hPerson = parseInt(tempEl.getAttribute("height"));
          var yPerson = parseInt(tempEl.getAttribute("y"));
          transformArr.push(prepare(tempEl, hPerson, hPersonFinal, yPerson, (yPersonLowest-(hPersonFinal*(i-1)))));
        }
      }


    // text stuff
    var div = roomsDisplay.children[room];
    // add the correct amount of personCost elements
    for(var i = 0; i < rooms[room]["occupancy"]; i++){
      var p1 = document.createElement("p");
      p1.className = "personCost";
      p1.textContent = "One Person: $" + perPersonCost.toFixed(2);
      div.appendChild(p1);
    }
    // create room cost element
    var p2 = document.createElement("p");
    p2.className = "roomCost";
    p2.textContent = "One Room: $" + perRoomCost.toFixed(2);
    div.appendChild(p2);
    // create total cost element
    var p3 = document.createElement("p");
    p3.className = "totalCost";
    p3.textContent = "Total Cost: $" + (perRoomCost + perPersonCost * people).toFixed(2);
    div.appendChild(p3);

  }
  // perform transformation animations on the SVG's
  transform(transformArr);
}

// Calculate how much height and y need to be incremented for 1/3 second transition
// and return an object to be placed into an array or objects to be transformed
function prepare(el, h, hFinal, y, yFinal){
  var hDelta = hFinal - h;
  // increment is found by dividing delta by frames/run throughs. for 1/3 second: 
  // interval repeats every 16 milliseconds for 60 fps/run throughs
  // 60/hDelta = 1 second, so 20/hDelta = 1/3 second
  var hIncr = hDelta/20;
  var yDelta = yFinal - y;
  var yIncr = yDelta/20;
  return {el: el, h: h, hIncr: hIncr, y: y, yIncr: yIncr};
}

// accept array of objects with el and transform information to be transformed
function transform(transArr){
  
  var counter = 0;
  var i = setInterval(function(){
    if(counter===20){
      clearInterval(i);
    } else{
      transArr.forEach(function(svg){
        svg.el.setAttribute("height", (svg.h+svg.hIncr));
        svg.el.setAttribute("y", (svg.y+svg.yIncr));
        svg.h = svg.h + svg.hIncr;
        svg.y = svg.y + svg.yIncr;

      });
      counter++;
    }  
  }, 16);

}



