// DOM element where the Timeline will be attached
var container = document.getElementById("timeline");
var timeline = new vis.Timeline(container);

var tl = [], data = [];
var selectedTimelines = [0];

var groups, subgroups;
var itemsMainGroups = [], itemsSubGroups = [];
var selectionMainGroups = [], selectionSubGroups = [];

const types = ["box", "range", "background"];
const schema = {
  // data
  "timeline": 0,
  "group": 1,
  "item": 2,

  // item
  "date_start": 0,
  "date_end": 1,
  "type": 2,
  "title": 3,
  "description": 4,
  "link": 5,

  // date
  "year": 0,
  "month": 1,
  "day": 2,

  // color
  "noColor": 0,
  "timelineColor": 1,
  "groupColor": 2,

  // groups
  "noGroups": 0,
  "timelineGroups": 1,
  "subGroups": 2,
}
var colors = schema.groupColor;
var timelineGroups = schema.timelineGroups;

var defaultOptions = [], clusterOptions = [];

var timelineRange = 0, globalMin = 0, globalMax = 0;

var selected = [];
var numSelected = 0;
var navOpen = false;

var subgroupsActive = false;
var onlySelectionVisible = false;

var sortMode = [1, 1], groupMode = [1, 1];

/***********************************
 *  Data Processing 
 * and Timeline Preparation
 * *********************************/

var timelineData = getTimelineData();
fillTimelineSelection();

initVariables();
createGroups();
itemsToDataset();
fillDatasetSidebar(sort(data,sortMode[1]));
determineGlobalMinMax();
configureTimeline();

// fill the drop-down menu with all available timelines
function fillTimelineSelection() {
  var tlSelect = document.getElementById("tlSelect");

  for (var t in timelineData.timelines) {
    var option = document.createElement("option");
    option.value = t;
    option.innerHTML = timelineData.timelines[t].name;
    tlSelect.appendChild(option);
  }
}

// fill the data object and the table showing active timelines
function initVariables() {
  tl = [], data = [];
  var n = 0;
  var table = document.querySelector('#tlOverview > tbody').children;

  for (var i = 0; i < selectedTimelines.length; i++) {

    tl[i] = timelineData.timelines[selectedTimelines[i]];

    // fill data object
    for (var j = 0; j < tl[i].groups.length; j++) {
      var group = tl[i].groups[j]
      for (var k = 0; k < group.dates.length; k++) {
        // data = [timeline, group, date]
        data[n] = [i, j, group.dates[k]];
        n++;  
      }
    }
  }

  // fill selected timelines table
  for (var i = 0; i < 3; i++) {
    table[i+1].innerHTML = "";
    var cells = [];
    for (var j = 0; j < 5; j++)
      cells[j] = table[i+1].insertCell();

    cells[1].innerHTML = i+1;
    if (selectedTimelines[i] != null) {
      cells[0].innerHTML = '<a id="tlRemove'+ i +'" class="button hover-red tlRemove" onclick="tlRemove('+ i +')"><i class="fa fa-fw fa-times-circle"></i></a>';
      cells[2].innerHTML = '<a class="button circle ' + tl[i].color.toLowerCase() + '"></a>';
      cells[3].innerHTML = tl[i].name; //+'<div class="tooltip"><i class="fa fa-fw fa-info-circle"></i>'+
      //'<span class="tooltiptext">'+tl[i].description+'</span></div>';
      cells[4].innerHTML = getItemCount(tl[i]);
    }
  }
}

function createGroups() {

  groups = new vis.DataSet(), 
  subgroups = new vis.DataSet();

  for (var i = 0; i < tl.length; i++) {
    var nested = [];
    // add subgroups
    for (var j = 0; j < tl[i].groups.length; j++) {
      subgroups.add({
        id: 10*(i+1) + j+1,
        content: tl[i].groups[j].name,
        value: j,
        className: 'border-' + tl[i].groups[j].color.toLowerCase()
      });
      nested[j] = 10*(i+1) + j+1;
    }
    // add main group
    subgroups.add({
      id: i+1,
      content: tl[i].name,
      value: i,
      nestedGroups: nested,
      className: 'border-' + tl[i].color.toLowerCase()
    });
    //add main group
    groups.add({
      id: i+1,
      content: tl[i].name,
      value: i,
      className: 'border-' + tl[i].color.toLowerCase()
    });
  }
}

function parseDate(array) {
  date = new Date();
  if (!array[1]) {
    date.setFullYear(array[0],0,1); // only year
  } else if (!array[2]) {
    date.setFullYear(array[0],array[1]-1,1); // year and month
  } else {
    date.setFullYear(array[0],array[1]-1,array[2]); // full date
  }
  return date;
}

function getGroup(item) {
  return tl[data[item][schema.timeline]].groups[data[item][schema.group]]
}

function getItemCount(timeline) {
  var count = 0
  for (let i = 0; i < timeline.groups.length; i++)
    count += timeline.groups[i].dates.length
  return count
}

function itemsToDataset() {

  itemsMainGroups = new vis.DataSet(),
  itemsSubGroups = new vis.DataSet();

  for (var i = 0; i < data.length; i++) {
    var item = data[i][schema.item];
    var start = parseDate(item[schema.date_start]);
    var end = new Date();
    if (item[schema.date_end] == null) end = start;
    else end = parseDate(item[schema.date_end]);

    content = '<div class="itemTitle">' + item[schema.title];// + '</div><div class="itemDate">' + data[j][0][0] + '</div>';
    
    if (item[schema.date_end] == null) dates = item[schema.date_start][schema.year];
    else dates = item[schema.date_start][schema.year] + ' to ' + item[schema.date_end][schema.year];

    if (colors == schema.groupColor) {
      color = getGroup(i).color.toLowerCase();
    } else if (colors == schema.timelineColor) {
      color = tl[data[i][schema.timeline]].color.toLowerCase();
    } else {
      color = "grey";
    }

    itemsMainGroups.add({
      id: i,
      group: data[i][schema.timeline]+1,
      start: start,
      end: end,
      type: types[item[schema.type]-1],
      content: content,
      title: item[schema.title] + ' (' + dates + ')',
      className: color + ' border-' + color
    });

    itemsSubGroups.add({
      id: i,
      group: 10*(data[i][schema.timeline]+1) + data[i][schema.group]+1,
      start: start,
      end: end,
      type: types[item[schema.type]-1],
      content: content,
      title: item[schema.title] + ' (' + dates + ')',
      className: color + ' border-' + color
    });
  }
}

function selectionToDataset() {

  itemsToDataset();

  selectionMainGroups = new vis.DataSet(),
  selectionSubGroups = new vis.DataSet();

  for(var i = 0; i < selected.length; i++) {
    if (selected[i]) {
      selectionMainGroups.add(itemsMainGroups.get(i));
      selectionSubGroups.add(itemsSubGroups.get(i));
    }
  }
}

function determineGlobalMinMax() {

  if (tl[0] != undefined) {
    globalMin = new Date(tl[0].options.min[0],tl[0].options.min[1]-1,tl[0].options.min[2]);
    globalMax = new Date(tl[0].options.max[0],tl[0].options.max[1]-1,tl[0].options.max[2]);
  } 
  
  for (var i = 1; i < tl.length; i++) {
    var min = new Date(tl[i].options.min[0],tl[i].options.min[1]-1,tl[i].options.min[2]);
    var max = new Date(tl[i].options.max[0],tl[i].options.max[1]-1,tl[i].options.max[2]);

    if (moment(min).isBefore(globalMin)) globalMin = min;
    else if (moment(max).isAfter(globalMax)) globalMax = max;
  }
}

function configureTimeline() {
  defaultOptions = {
    height: "100%", //tl.options.height + "px",
    stack: true,
    horizontalScroll: true,
    zoomKey: 'ctrlKey',
    min: globalMin,      // lower limit of visible range
    max: globalMax,        // upper limit of visible range
    zoomMin: 1000 * 60 * 60 * 24 * 5, // one day in milliseconds
    //zoomMax: 1000 * 60 * 60 * 24 * 31 * 3,     // about three months in milliseconds
    locale: 'en',
    groupOrder: function (a, b) {
      return a.value - b.value;
    },

    loadingScreenTemplate: function () {
      return "<h1>Loading...</h1>";
    },

    showTooltips: true,//tl.options.tooltips,
    tooltip: {
      followMouse: true,
      overflowMethod: 'cap',
    },

    template: (itemData, element, data) => {
      if (data.isCluster) {
        return `<span class="cluster">${data.items.length}</span>`;
      } 
      // else if (element.isRange) {
      //   return `<div>${data.content}</div><i>${data.start}</i>`;
      else {
        return `<div>${data.content}</div>`;
      }
    },
  };

  var options = {};

  clusterOptions = {
    cluster: {
      titleTemplate: "Cluster containing {count} events. Zoom in to see the individual events.",
      showStipes: false,
    }
  };

  Object.assign(options, defaultOptions);

  // Fill Timeline
  timeline.setOptions(options);
  timeline.setGroups(groups);
  timeline.setItems(itemsMainGroups);

  timeline.fit();

  // Progress bar
  timelineRange = defaultOptions.max - defaultOptions.min;
}

function refreshContent() {
  if (onlySelectionVisible) {
    if (subgroupsActive) timeline.setItems(selectionSubGroups)
    else timeline.setItems(selectionMainGroups)
  }
  else
  {
    if (subgroupsActive) timeline.setItems(itemsSubGroups);
    else timeline.setItems(itemsMainGroups);
  }
}

/***********************************
 *  Timeline Control
 * *********************************/

/**
 * Move the timeline a given percentage to left or right
 * @param {Number} percentage   For example 0.1 (left) or -0.1 (right)
 * @param {Boolean} animation   Show smooth animation
 */
function move(percentage, animation) {
  var range = timeline.getWindow();
  var interval = range.end - range.start;

  if (animation == true) {
    timeline.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end: range.end.valueOf() - interval * percentage,
    });
  } else {
    timeline.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end: range.end.valueOf() - interval * percentage,
      animation: {duration: 100, easingFunction: 'linear'}
    });
  }
}

// attach events to the navigation buttons
document.getElementById("zoomIn").onclick = function () { timeline.zoomIn(0.5); };
document.getElementById("zoomOut").onclick = function () { timeline.zoomOut(0.5); };
document.getElementById("moveLeft").onclick = function () { move(0.5, true); };
document.getElementById("moveRight").onclick = function () { move(-0.5, true); };
document.getElementById("fit").onclick = function () { timeline.fit(); };


document.getElementById("selectVisible").onclick = function () {
  var visible = timeline.getVisibleItems();
  clearSelection();
  addToSelection(visible);
};

// Keyboard input
document.addEventListener(
  "keydown",
  function (event) {
    switch (event.key) {
      case "ArrowDown":
        timeline.zoomOut(0.5);
        break;
      case "ArrowUp":
        timeline.zoomIn(0.5);
        break;
      case "ArrowLeft":
        move(0.3, false);
        break;
      case "ArrowRight":
        move(-0.3, false);
        break;
      default:
        return;
    }
  },
  true
);

/***********************************
 *  Timeline Options
 * *********************************/

var clusteringEnabled = false;

document.getElementById("toggleClustering").onclick = function() {
  var options = {};
  if (clusteringEnabled) {
    Object.assign(options, defaultOptions);
    this.innerHTML = "Clustering off";
    clusteringEnabled = false;
  } else {
    Object.assign(options, defaultOptions, clusterOptions);
    this.innerHTML = "Clustering on";
    clusteringEnabled = true;
  }
  timeline.setOptions(options);
}

document.getElementById("groupTimeline").onclick = function() {
  if (timelineGroups == schema.subGroups) {
    this.innerHTML = "Not grouped";
    timelineGroups = schema.noGroups;
    timeline.setGroups(null);
    subgroupsActive = false;
  } else if (timelineGroups == schema.noGroups) {
    this.innerHTML = "Grouped by timeline";
    timelineGroups = schema.timelineGroups;
    timeline.setGroups(groups);
    subgroupsActive = false;
  } else if (timelineGroups == schema.timelineGroups) {
    this.innerHTML = "Grouped by category";
    timelineGroups = schema.subGroups;
    timeline.setGroups(subgroups);
    subgroupsActive = true;
  }
  refreshContent();
}

document.getElementById("colorTimeline").onclick = function() {
  var icon = this.firstChild.classList;
  if (colors == schema.groupColor) {
    this.innerHTML = "Not colored";
    colors = schema.noColor;
  } else if (colors == schema.noColor) {
    this.innerHTML = "Colored by timeline";
    colors = schema.timelineColor;
  } else if (colors == schema.timelineColor) {
    this.innerHTML = "Colored by category";
    colors = schema.groupColor;
  }
  selectionToDataset();
  refreshContent();
}


// add timeline
document.getElementById("tlAdd").onclick = function () {
  var tlSelect = document.getElementById("tlSelect");
  var id = parseInt(tlSelect.value);
  if (id >= 0) {
    if (selectedTimelines.includes(id)) {
      alert("Timeline already added");
    } else {
      if (selectedTimelines.length > 2) {
        alert("Only a maximum of 3 timelines can be added");
      } else {
        selectedTimelines.push(id);
  
        initVariables();
        createGroups();
        itemsToDataset();
        fillDatasetSidebar(sort(data,sortMode[1]));
  
        //timeline.setGroups(groups);

        determineGlobalMinMax();
        configureTimeline();
        refreshContent();
      }
    }
  }
}

// remove timeline
function tlRemove(n) {
  selectedTimelines.splice(n,1);

  initVariables();
  createGroups();
  itemsToDataset();
  fillDatasetSidebar(sort(data,sortMode[1]));

  // timeline.setGroups(groups);

  determineGlobalMinMax();
  configureTimeline();
  refreshContent();
}

/***********************************
 *  User Interface
 * *********************************/

// Create an HTML object
function create(type, classes, id) {
  element = document.createElement(type);
  if (classes) element.className = classes;
  if (id) element.id = id;
  return element;
}

// Add item to selection
function addToSelection(items) {
  var accordion = document.getElementById("infoAccordionSelection");
  items.forEach(s => {
    if(!selected[s]) {
      accordion.insertBefore(getInfoItem(s),accordion.firstChild);
      accordion.insertBefore(getButton(s, false),accordion.firstChild);
      selected[s] = true;
      numSelected++;
      document.getElementById("tabBtnSelection").innerHTML = 'Selection (' + numSelected + ')';
      if (!navOpen) document.getElementById("toggleNav").classList.add("flash");
      // if (!navOpen) document.getElementById("badge").style.display = "block";
    }
  });

  selectionToDataset();
  refreshContent();
}

function removeFromSelection(items) {
  items.forEach(s => {
    document.getElementById('item' + s).remove();
    document.getElementById('panel' + s).remove();
    selected[s] = false;
    numSelected--;
    if (numSelected == 0) document.getElementById("tabBtnSelection").innerHTML = 'Selection';
    else document.getElementById("tabBtnSelection").innerHTML = 'Selection (' + numSelected + ')';
  });

  selectionToDataset();
  refreshContent();
}

function clearSelection() {
  for(var i = 0; i < selected.length; i++) {
    if (selected[i]) {
      document.getElementById('item' + i).remove();
      document.getElementById('panel' + i).remove();
    }
  }
  selected = [];
  numSelected = 0;
  document.getElementById("tabBtnSelection").innerHTML = 'Selection';
}

// Create item accordion buttons
function getButton(s, dataset) {
  item = data[s][schema.item];
  button = create('div', 'accordion border-' + getGroup(s).color.toLowerCase(), 'item' + s)
  title = create('div');
  title.innerHTML = item[schema.title];

  // Create focus button
  foc = create('a', 'left hover-highlight');
  foc.title = 'Focus on this item in the timeline';
  foc.innerHTML = '<i class="fa fa-fw fa-crosshairs"></i>';
  foc.onclick = function () { 
    timeline.setSelection(s, {
      focus: true,
    });
  };
  if (dataset) {
    // Create add button
    btn = create('a', 'right hover-green');
    btn.title = 'Add this item to selection';
    btn.innerHTML = '<i class="fa fa-fw fa-plus-circle"></i>'
    btn.onclick = function () { 
      addToSelection([s]);
    };
  } else {
    // Create delete button
    btn = create('a', 'right hover-red');
    btn.title = 'Remove this item from selection';
    btn.innerHTML = '<i class="fa fa-fw fa-times-circle"></i>'
    btn.onclick = function () { 
      removeFromSelection([s]);
    };
  }
  
  title.addEventListener("click", function() {
    this.parentElement.classList.toggle("active");

    var panel = this.parentElement.nextElementSibling;
    if (panel.style.maxHeight) panel.style.maxHeight = null;
    else panel.style.maxHeight = panel.scrollHeight + "px";
  });

  button.appendChild(foc);
  button.appendChild(title);
  button.appendChild(btn);

  return button;
}

// Create item bodies
function getInfoItem(s) {

  info = create('div', 'panel', 'panel' + s);
  
  var item = data[s][schema.item];
  var dates;
  if (item[schema.date_end] == null) dates = item[schema.date_start][schema.year];
  else dates = item[schema.date_start][schema.year] + ' to ' + item[schema.date_end][schema.year];

  info.innerHTML =
              '<div class="infoContent">' +
                '<p class="infoCategory" title="Timeline: ' + tl[data[s][schema.timeline]].name + '\n' +
                'Category: ' + tl[data[s][schema.timeline]].groups[data[s][schema.group]] + '">' + 
                tl[data[s][schema.timeline]].name + ' > ' + getGroup(s).name + '</p>' +
                '<h3 class="infoHeading">' + item[schema.title] + '</h3>' +
                '<p class="infoDates">' + dates + '</p>' +
                '<p class="infoDescription">' + item[schema.description] + '</p>' +
                '<br><a class="infoLink" href="https://en.wikipedia.org/wiki/' + item[schema.link] + '"  target="_blank" rel="noopener noreferrer"><i class="fa fa-fw fa-external-link"></i> Wikipedia</a>'+
              '</div>';
  return info;
}

// Add all items to dataset sidebar
function fillDatasetSidebar(sortedData) {
  var infoAccordion = document.getElementById("infoAccordionDataset");
  infoAccordion.innerHTML = "";

  if (groupMode[1] == 1) { // group timelines
    // create container
    for (let i = 0; i < tl.length; i++) {
      var heading = create('div', 'group-heading');
      heading.innerHTML = tl[i].name;
      infoAccordion.appendChild(heading);
      infoAccordion.appendChild(create('div', 'group', 'group' + i));
    }
    // fill container
    for (var i = 0; i < sortedData.length; i++) {
      document.getElementById("group" + sortedData[i][0]).appendChild(getButton(i, true));
      document.getElementById("group" + sortedData[i][0]).appendChild(getInfoItem(i));
    }
  } else { // no groups
    for (var i = 0; i < sortedData.length; i++) {
      infoAccordion.appendChild(getButton(i, true));
      infoAccordion.appendChild(getInfoItem(i));
    }
  }
  
  document.getElementById("tabBtnDataset").innerHTML = 'Dataset (' + sortedData.length + ')';

  itemsToDataset();
  refreshContent();
}

// Add selected items to selection sidebar
timeline.on('select', function () {
  if (Number.isInteger(timeline.getSelection()[0])) {
    var selection = timeline.getSelection();
    addToSelection(selection);
    timeline.setSelection(selection, {focus: false});
  }
});

// Toggle the sidebar
function toggleNav() {
  var w = document.documentElement.clientWidth || window.innerWidth;
  ratio = 25
  if (w <= 700) ratio = 75;
  else if (w <= 1000) ratio = 50;
  else if (w <= 1400) ratio = 35;
  else ratio = 25;

  if (navOpen) {
    document.getElementById("infoSidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("toggleNav").title = "Open Sidebar";
    document.getElementById("toggleNav").style.transform = "rotate(0deg)";
    document.getElementById("optionsMenu").style.width = "100%";
    navOpen = false;
  } else {
    document.getElementById("infoSidenav").style.width = ratio + "%";
    document.getElementById("sidetab").style.width = ratio + "%";
    document.getElementById("SelectionMenu").style.width = ratio + "%";
    document.getElementById("DatasetMenu").style.width = ratio + "%";
    document.getElementById("main").style.marginRight = ratio + "%";
    document.getElementById("optionsMenu").style.width = (100 - ratio) + "%";
    document.getElementById("toggleNav").title = "Close Sidebar";
    document.getElementById("toggleNav").style.transform = "rotate(-90deg)";
    document.getElementById("toggleNav").classList.remove("flash");
    
    //document.getElementById("badge").style.display = "none";
    navOpen = true;
  }
}

var optionsOpen = false;

function toggleOptions() {
  if (optionsOpen) {
    document.getElementById("optionsMenu").style.height = "0";
    document.getElementById("optionsMenu").style.top = "92%";
    document.getElementById("toggleOptions").classList.remove("active");
    optionsOpen = false;
  } else {
    document.getElementById("optionsMenu").style.height = "82%";
    document.getElementById("optionsMenu").style.top = "10%";
    document.getElementById("toggleOptions").classList.add("active");
    optionsOpen = true;
  }
}

// Open tabs in the sidebar
function openTab(evt, tabName) {

  var tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Open default tab
document.getElementById("tabBtnSelection").click();

// Select and focus all items from the sidebar selection in the timeline
document.getElementById("focusSelection").onclick = function () {
  var toSelect = [];
  for(var i = 0; i < selected.length; i++) {
    if (selected[i]) toSelect.push(i);
  }
  timeline.setSelection(toSelect, { focus: true });
};

document.getElementById("toggleSelectionVisibility").onclick = function () {

  if (onlySelectionVisible) {
    onlySelectionVisible = false;
    refreshContent();
    this.classList.remove("active");
    this.title = "Show all items";
  } else {
    selectionToDataset();
    onlySelectionVisible = true;
    refreshContent();
    this.classList.add("active");
    this.title = "Only show items in selection";
  }
}

var modal = document.getElementById('clearSelectionModal');

// Show modal if selection is not empty
document.getElementById("clearSelection").onclick = function () {
  if (numSelected > 0) modal.style.display = "block";
}

// Clear selection in the sidebar
document.getElementById("clearSelectionBtn").onclick = function () {
  clearSelection();
  modal.style.display = "none";
};

/***********************************
 *  Sort & Search
 * *********************************/

function toggleSort(dataset) {
  var button, icon;
  if (dataset) {
    button = document.getElementById("sortDataset");
    icon = document.getElementById("sortDataset").firstChild.classList;
  } else {
    button = document.getElementById("sortSelection");
    icon = document.getElementById("sortSelection").firstChild.classList;
  }

  if (sortMode[dataset] == 0) {
    icon.remove("fa-sort-alpha-asc");
    icon.add("fa-sort-numeric-asc");
    button.title = "Sorted by starting date";
    sortMode[dataset] = 1;
    fillDatasetSidebar(sort(data,sortMode[dataset]));
  } else if (sortMode[dataset] == 1) {
    icon.remove("fa-sort-numeric-asc");
    icon.add("fa-sort-alpha-asc");
    button.title = "Sorted alphabetically";
    sortMode[dataset] = 0;
    fillDatasetSidebar(sort(data,sortMode[dataset]));
  }
}

document.getElementById("sortSelection").onclick = function () { toggleSort(0); }
document.getElementById("sortDataset").onclick = function () { toggleSort(1); }

function sort(array, mode) {

  // copy of array

  if (mode) { 
    // sort numerical
    array.sort(function(a, b) {
      var dateA = parseDate(a[2][0]);
      var dateB = parseDate(b[2][0]);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  } 
  else { 
    // sort alphabetical
    array.sort(function(a, b) {
      var nameA = a[2][4].toUpperCase();
      var nameB = b[2][4].toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }
  return array;
}

function toggleGroup(dataset) {
  var button, icon;
  if (dataset) {
    button = document.getElementById("groupDataset");
    icon = document.getElementById("groupDataset").firstChild.classList;
  } else {
    button = document.getElementById("groupSelection");
    icon = document.getElementById("groupSelection").firstChild.classList;
  }
  
  if (groupMode[dataset] == 1) {
    icon.remove("fa-th");
    icon.add("fa-list");
    button.title = "Items not grouped";
    groupMode[dataset] = 0;
    fillDatasetSidebar(sort(data,sortMode[1]));
  } else if (groupMode[dataset] == 0) {
    icon.remove("fa-list");
    icon.add("fa-th-large");
    button.title = "Items grouped by timeline";
    groupMode[dataset] = 1;
    fillDatasetSidebar(sort(data,sortMode[1]));
  } 
  //   else if (groupMode[dataset] == 1) {
  //   icon.remove("fa-th-large");
  //   icon.add("fa-th");
  //   button.title = "Items grouped by category";
  //   groupMode[dataset] = 2;
  //   fillDatasetSidebar(sort(data,sortMode[1]));
  // }
}

document.getElementById("groupSelection").onclick = function () { toggleGroup(0); }
document.getElementById("groupDataset").onclick = function () { toggleGroup(1); }

// Search

var searchOpen = [false, false];

// selection searchbar
document.getElementById("toggleSelectionSearch").onclick = function () {
  if (searchOpen[0]) {
    // clear search and close selection searchbar
    searchOpen[0] = false;
    document.getElementById("SelectionSearch").style.display = "none";
    document.getElementById("SelectionSearch").value = "";
    search(0);
    document.getElementById("infoAccordionSelection").style.marginTop = 90 + "px";
    this.classList.remove("active");
  } else {
    // open selection searchbar
    searchOpen[0] = true;
    document.getElementById("SelectionSearch").style.display = "block";
    document.getElementById("infoAccordionSelection").style.marginTop = 90 + 31 + "px";
    this.classList.add("active");
  }
}

// dataset searchbar
document.getElementById("toggleDatasetSearch").onclick = function () {
  if (searchOpen[1]) {
    // clear search and close dataset searchbar
    searchOpen[1] = false;
    document.getElementById("DatasetSearch").style.display = "none";
    document.getElementById("DatasetSearch").value = "";
    search(1);
    document.getElementById("infoAccordionDataset").style.marginTop = 90 + "px";
    this.classList.remove("active");
  } else {
    // open dataset searchbar
    searchOpen[1] = true;
    document.getElementById("DatasetSearch").style.display = "block";
    document.getElementById("infoAccordionDataset").style.marginTop = 90 + 31 + "px";
    this.classList.add("active");
  }
}

// search function
function search(dataset) {
  var input, filter, list, head, content, name, i;
  if (dataset) {
    input = document.getElementById("DatasetSearch");
    list = document.getElementById("infoAccordionDataset");
  } else {
    input = document.getElementById("SelectionSearch");
    list = document.getElementById("infoAccordionSelection");
  }
  filter = input.value.toUpperCase();
  head = list.getElementsByClassName("accordion");
  content = list.getElementsByClassName("panel")

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < head.length; i++) {
    name = head[i].getElementsByTagName("div")[0];
    if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
      head[i].style.display = "";
      content[i].style.display = "";
    } else {
      head[i].style.display = "none";
      content[i].style.display = "none";
    }
  }
}


// progress bar update
timeline.on('rangechange', function (properties) {

  currentStart = properties.start;
  currentEnd = properties.end;
  currentRange = currentEnd-currentStart;

  width = currentRange / timelineRange * 100;
  start = (currentStart-defaultOptions.min) / timelineRange * 100;

  var progress = document.getElementById("progress");
  progress.style.width = width + "%";
  progress.style.marginLeft = start + "%";
  
});

// Make progress bar draggable
dragProgress(document.getElementById("progress"));

function dragProgress(elmnt) {
  
  var pos1 = 0, pos2 = 0, width = 0, range = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    width = elmnt.parentElement.offsetWidth;
    //elmnt.style.backgroundColor = "#ff8c00";
    // get the mouse cursor position at startup:
    pos1 = e.clientX;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos2 = pos1 - e.clientX;
    pos1 = e.clientX;
    range = timeline.getWindow();

    timeline.setWindow({
      start: range.start.valueOf() - timelineRange * (pos2/width),
      end: range.end.valueOf() - timelineRange * (pos2/width),
      animation: false,
    });
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    //elmnt.style.backgroundColor = "#ffa500";
  }
}

function setTheme(newTheme) {
  window.__theme = newTheme;
  theme = newTheme;
  document.body.className = newTheme;
  window.__onThemeChange(newTheme);
  // document.getElementById("toggleTheme").title = newTheme + " theme";
}

void function() {
  var preferredTheme;

  window.__onThemeChange = function() {}
  try {
    preferredTheme = localStorage.getItem('theme')
  } catch (err) {}

  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (err) {}
  }

  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  })

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
}()

// Enable navigation prompt
window.onbeforeunload = function() {
  return true;
};
// Remove navigation prompt
window.onbeforeunload = null;


window.onclick = function(event) {
  if (event.target == modal)
    modal.style.display = "none";
  
  if (event.target.matches("#toggleDropup") || event.target.matches("#toggleDropup *")) {
    document.getElementById("styleDropup").classList.toggle("show");
    document.getElementById("toggleDropup").classList.toggle("active");
  }
  else if (!event.target.matches(".dropup-content") && !event.target.matches(".dropup-content *")) {
    document.getElementById("styleDropup").classList.remove("show");
    document.getElementById("toggleDropup").classList.remove("active");
  }
}
