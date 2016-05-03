$(document).ready(function(){
    $.getJSON('http://api.tpl.davidchchang.com/branches', function(data) {
        console.log(data);
        var numBranches = Object.keys(data).length;
        console.log(numBranches);

        var branches = Object.keys(data);

        var listing = branches.reduce(function(previousValue, currentValue, currentIndex, array){

            var branchClasses = "branch";
            branchClasses += data[currentValue].accessibility.wheelchair ? " wheelchair-yes" : " wheelchair-no";
            branchClasses += data[currentValue].accessibility.wireless ? " wireless-yes" : " wireless-no";
            branchClasses += (typeof data[currentValue].hours.Monday == "object") ? " monday-open" : " monday-close";
            branchClasses += (typeof data[currentValue].hours.Tuesday == "object") ? " tuesday-open" : " tuesday-close";
            branchClasses += (typeof data[currentValue].hours.Wednesday == "object") ? " wednesday-open" : " wednesday-close";
            branchClasses += (typeof data[currentValue].hours.Thursday == "object") ? " thursday-open" : " thursday-close";
            branchClasses += (typeof data[currentValue].hours.Friday == "object") ? " friday-open" : " friday-close";
            branchClasses += (typeof data[currentValue].hours.Saturday == "object") ? " saturday-open" : " saturday-close";
            branchClasses += (typeof data[currentValue].hours.Sunday == "object") ? " sunday-open" : " sunday-close";

            return previousValue + "<li class='" + branchClasses + "'>" + currentValue + " - <em>" + data[currentValue].address[0] + "</em>" +
                "<ul class='branchDetail'>" +
                    "<li class='hours'> Hours: - " + "Note: " + (data[currentValue].hours.note != null ? data[currentValue].hours.note : "N/A") +
                        "<ul>" +
                            "<li>Monday: " + (typeof data[currentValue].hours.Monday == "object" ? "Opening - " + data[currentValue].hours.Monday.opening + " Closing - " + data[currentValue].hours.Monday.closing : "CLOSED") + "</li>" +
                            "<li>Tuesday: " + (typeof data[currentValue].hours.Tuesday == "object" ? "Opening - " + data[currentValue].hours.Tuesday.opening + " Closing - " + data[currentValue].hours.Tuesday.closing : "CLOSED") + "</li>" +
                            "<li>Wednesday: " + (typeof data[currentValue].hours.Wednesday == "object" ? "Opening - " + data[currentValue].hours.Wednesday.opening + " Closing - " + data[currentValue].hours.Wednesday.closing : "CLOSED") + "</li>" +
                            "<li>Thursday: " + (typeof data[currentValue].hours.Thursday == "object" ? "Opening - " + data[currentValue].hours.Thursday.opening + " Closing - " + data[currentValue].hours.Thursday.closing : "CLOSED") + "</li>" +
                            "<li>Friday: " + (typeof data[currentValue].hours.Friday == "object" ? "Opening - " + data[currentValue].hours.Friday.opening + " Closing - " + data[currentValue].hours.Friday.closing : "CLOSED") + "</li>" +
                            "<li>Saturday: " + (typeof data[currentValue].hours.Saturday == "object" ? "Opening - " + data[currentValue].hours.Saturday.opening + " Closing - " + data[currentValue].hours.Saturday.closing : "CLOSED") + "</li>" +
                            "<li>Sunday: " + (typeof data[currentValue].hours.Sunday == "object" ? "Opening - " + data[currentValue].hours.Sunday.opening + " Closing - " + data[currentValue].hours.Sunday.closing : "CLOSED") + "</li>" +
                        "</ul>" +
                    "</li>" +
                    "<li>Wheelchair: " + (data[currentValue].accessibility.wheelchair ? "Yes" : "No") + "</li>" +
                    "<li>Wireless: " + (data[currentValue].accessibility.wireless ? "Yes" : "No") + "</li>" +
                    "<li>Telephone: " + data[currentValue].phone_number + "</li>" +
                    "<li>URL: <a href='" + data[currentValue].url + "'target='_blank'>" + data[currentValue].url + "</a></li>" +
                    "<iframe src='https://www.google.com/maps/embed/v1/search?key=AIzaSyD8JkXN_0TRxUoKqAQEpBLY-ScaD0FaRxg&q=" + data[currentValue].address[0] + "'></iframe>" +
                "</ul>" +
                "</li>";
        }, "");

        $(".branches").html(listing);

        /**toggle the branch info**/
        $(".branchDetail").hide();
        $(".branch").click(function(){
            $(this).find(".branchDetail").toggle();
        })

        /**total branches visible at the beginning**/
        var numberVisible = $(".branches .branch:visible").length;
        $(".number-visible").html(numberVisible);

        /**filters**/
        $("#filter :checkbox").click(function () {
            var value = $(this).val();
            if($(this).is(":checked")){
                /*$(".branches").removeClass(value + "-hide");*/
                $(".branches").addClass(value + "-show");
                numberVisible = $(".branches .branch:visible").length;
                $(".number-visible").html(numberVisible);
            } else {
                /*$(".branches").addClass(value + "-hide");*/
                $(".branches").removeClass(value + "-show");
                numberVisible = $(".branches .branch:visible").length;
                $(".number-visible").html(numberVisible);
            }
        });

    }).success(function() {
        console.log("Successfully retrieved data.");
    }).error(function() {
        console.log("Service Unavailable.");
    });


})
