$(document).ready(function(){
    $.getJSON('http://api.tpl.davidchchang.com/branches', function(data) {
        var data = data;
        var markers = [];
        var branches = {};
        var allBranches = Object.keys(data);
        var infowindow = new google.maps.InfoWindow();

        /**adding branch markers on map, and create markers , branches data and element into an object**/
        $.each(data, function(key, branch) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(branch.coordinates.latitude, branch.coordinates.longitude),
                branch: branch
            });
            marker.setMap(map);
            markers.push(marker);

            var infowindowHTML  = "<strong>" + branch.name + "</strong>" + " - <em>" + branch.address[0] + "</em>" +
                "<br>" +
                "<ul>" +
                    "<li>Hours: - Note: " + (branch.hours.note != null ? branch.hours.note : "N/A") + "</li>" +
                    "<ul>" +
                        "<li>Monday: " + (typeof branch.hours.Monday == "object" ? "Opening - " + branch.hours.Monday.opening + " Closing - " + branch.hours.Monday.closing : "CLOSED") + "</li>" +
                        "<li>Tuesday: " + (typeof branch.hours.Tuesday == "object" ? "Opening - " + branch.hours.Tuesday.opening + " Closing - " + branch.hours.Tuesday.closing : "CLOSED") + "</li>" +
                        "<li>Wednesday: " + (typeof branch.hours.Wednesday == "object" ? "Opening - " + branch.hours.Wednesday.opening + " Closing - " + branch.hours.Wednesday.closing : "CLOSED") + "</li>" +
                        "<li>Thursday: " + (typeof branch.hours.Thursday == "object" ? "Opening - " + branch.hours.Thursday.opening + " Closing - " + branch.hours.Thursday.closing : "CLOSED") + "</li>" +
                        "<li>Friday: " + (typeof branch.hours.Friday == "object" ? "Opening - " + branch.hours.Friday.opening + " Closing - " + branch.hours.Friday.closing : "CLOSED") + "</li>" +
                        "<li>Saturday: " + (typeof branch.hours.Saturday == "object" ? "Opening - " + branch.hours.Saturday.opening + " Closing - " + branch.hours.Saturday.closing : "CLOSED") + "</li>" +
                        "<li>Sunday: " + (typeof branch.hours.Sunday == "object" ? "Opening - " + branch.hours.Sunday.opening + " Closing - " + branch.hours.Sunday.closing : "CLOSED") + "</li>" +
                "</ul>";

            marker.addListener("click", function(){
                infowindow.close();
                infowindow.setContent(infowindowHTML);
                infowindow.open(map, marker);
            });

            branches[branch.name] = {};
            branches[branch.name]["marker"] = marker;
            branches[branch.name]["data"] = branch;
            $element = $("<li data-branchname='"+ branch.name + "' class='branch'>" + branch.name + " - <em>" + branch.address[0] + "</em>" +
                "<ul class='branchDetail'>" +
                "<li class='hours'> Hours: - " + "Note: " + (branch.hours.note != null ? branch.hours.note : "N/A") +
                "<ul>" +
                "<li>Monday: " + (typeof branch.hours.Monday == "object" ? "Opening - " + branch.hours.Monday.opening + " Closing - " + branch.hours.Monday.closing : "CLOSED") + "</li>" +
                "<li>Tuesday: " + (typeof branch.hours.Tuesday == "object" ? "Opening - " + branch.hours.Tuesday.opening + " Closing - " + branch.hours.Tuesday.closing : "CLOSED") + "</li>" +
                "<li>Wednesday: " + (typeof branch.hours.Wednesday == "object" ? "Opening - " + branch.hours.Wednesday.opening + " Closing - " + branch.hours.Wednesday.closing : "CLOSED") + "</li>" +
                "<li>Thursday: " + (typeof branch.hours.Thursday == "object" ? "Opening - " + branch.hours.Thursday.opening + " Closing - " + branch.hours.Thursday.closing : "CLOSED") + "</li>" +
                "<li>Friday: " + (typeof branch.hours.Friday == "object" ? "Opening - " + branch.hours.Friday.opening + " Closing - " + branch.hours.Friday.closing : "CLOSED") + "</li>" +
                "<li>Saturday: " + (typeof branch.hours.Saturday == "object" ? "Opening - " + branch.hours.Saturday.opening + " Closing - " + branch.hours.Saturday.closing : "CLOSED") + "</li>" +
                "<li>Sunday: " + (typeof branch.hours.Sunday == "object" ? "Opening - " + branch.hours.Sunday.opening + " Closing - " + branch.hours.Sunday.closing : "CLOSED") + "</li>" +
                "</ul>" +
                "</li>" +
                "<li>Wheelchair: " + (branch.accessibility.wheelchair ? "Yes" : "No") + "</li>" +
                "<li>Wireless: " + (branch.accessibility.wireless ? "Yes" : "No") + "</li>" +
                "<li>Telephone: " + branch.phone_number + "</li>" +
                "<li>URL: <a href='" + branch.url + "'target='_blank'>" + branch.url + "</a></li>" +
                "</ul>" +
                "</li>");
            $(".branches").append($element);

            branches[branch.name]["element"] = $element;
        });
        console.log(branches);

        /**toggle the branch info**/
        $(".branchDetail").hide();
        $(".branch").click(function(){
            $(this).find(".branchDetail").toggle();
        });

        /**total branches visible at the beginning**/
        var numberVisible = $(".branches .branch:visible").length;
        $(".number-visible").html(numberVisible);

        /**filters**/
        $("#filter").find(":checkbox").click(function () {
            $(".branch").hide();
            $.each(markers, function(key, marker){
                marker.setVisible(false);
            });

            var filtersArray = $("#filter").find("input").toArray();
            var filteredResults = filtersArray.reduce(function(previousResults, currentElement, currentIndex, array){
                var $filter = $(currentElement);
                var testFn = $filter.data("test-condition");
                var results = {};

                $.each(previousResults, function(key, branch){
                    if(!$filter.is(":checked") || eval(testFn)){
                        results[key] = branch;
                    }
                });
                return results;
            }, branches);

            $.each(filteredResults, function(key, branch){
                branch["element"].show();
                branch["marker"].setVisible(true);
            });

        });




    }).success(function() {
        console.log("Successfully retrieved data.");
    }).error(function() {
        console.log("Service Unavailable.");
    });

})

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10
    });

    /**Geolocation of the user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        })
    } else {
        // Browser doesn't support Geolocation
        console.log("Geolocation not supported");
    }**/

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': "North York, Ontario"}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                position: results[0].geometry.location
            });
            map.setCenter(marker.getPosition());
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
};

var viewSelector = function(view){
    $("#map").hide();
    $(".number-branches").hide();
    $(".branches").hide();
    if(view == "map-view"){
        $("#map").css("height", "500px");
        $("#map").show();
    } else if(view == "list-view"){
        $(".number-branches").show();
        $(".branches").show();
    } else{
        $("#map").css("height", "300px");
        $("#map").show();
        $(".number-branches").show();
        $(".branches").show();
    }
};