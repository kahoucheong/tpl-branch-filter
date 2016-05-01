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
                    "<li class='hours'> Hours: - " + "Note: " + data[currentValue].hours.note +
                        "<ul>" +
                            "<li>Monday: Opening - " + data[currentValue].hours.Monday.opening + " Closing - " + data[currentValue].hours.Monday.closing + "</li>" + 
                            "<li>Tuesday: Opening - " + data[currentValue].hours.Tuesday.opening + " Closing - " + data[currentValue].hours.Tuesday.closing + "</li>" +
                            "<li>Wednesday: Opening - " + data[currentValue].hours.Wednesday.opening + " Closing - " + data[currentValue].hours.Wednesday.closing + "</li>" +
                            "<li>Thursday: Opening - " + data[currentValue].hours.Thursday.opening + " Closing - " + data[currentValue].hours.Thursday.closing + "</li>" +
                            "<li>Friday: Opening - " + data[currentValue].hours.Friday.opening + " Closing - " + data[currentValue].hours.Friday.closing + "</li>" +
                            "<li>Saturday: Opening - " + data[currentValue].hours.Saturday.opening + " Closing - " + data[currentValue].hours.Saturday.closing + "</li>" +
                            "<li>Sunday: Opening - " + data[currentValue].hours.Sunday.opening + " Closing - " + data[currentValue].hours.Sunday.closing + "</li>" +
                        "</ul>" +
                    "</li>" +
                    "<li>Wheelchair: " + (data[currentValue].accessibility.wheelchair ? "Yes" : "No") + "</li>" +
                    "<li>Wireless: " + (data[currentValue].accessibility.wireless ? "Yes" : "No") + "</li>" +
                    "<li>Telephone: " + data[currentValue].phone_number + "</li>" +
                    "<li>URL: <a href='" + data[currentValue].url + "'target='_blank'>" + data[currentValue].url + "</a></li>" +
                "</ul>" +
                "</li>";
        }, "");

        $(".branches").html(listing);

        /**toggle the branch info**/
        $(".branchDetail").hide();
        $(".branch").click(function(){
            $(this).find(".branchDetail").toggle();
        })


        /**filters**/
        $("#filter :checkbox").click(function () {
            var value = $(this).val();
            if($(this).is(":checked")){
                /*$(".branches").removeClass(value + "-hide");*/
                $(".branches").addClass(value + "-show");
            } else {
                /*$(".branches").addClass(value + "-hide");*/
                $(".branches").removeClass(value + "-show");
            }
        });

        $.each(data, function(index, branch){
            if (typeof branch.hours.Monday == "object"){
                console.log("it is an object");
            }

        })

    }).success(function() {
        console.log("Successfully retrieved data.");
    }).error(function() {
        console.log("Service Unavailable.");
    });


})
