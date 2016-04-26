$(document).ready(function(){
    $.getJSON('http://api.tpl.davidchchang.com/branches', function(data) {
        console.log(data);
        var numBranches = Object.keys(data).length;
        console.log(numBranches);

        var branches = Object.keys(data);

        var listing = branches.reduce(function(previousValue, currentValue, currentIndex, array){
            return previousValue + "<li class='branch'>" + currentValue + " - <em>" + data[currentValue].address[0] + "</em>" +
                "<ul class='branchDetail'>" +
                "<li class=' wheelchair Wheelchair" + "" + (data[currentValue].accessibility.wheelchair ? "Yes" : "No") + "'>Wheelchair: " + (data[currentValue].accessibility.wheelchair ? "Yes" : "No") + "</li>" +
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


        /**$.each(data, function (index, branch) {
            console.log(branch.accessibility.wheelchair);
        })**/

        $("#filter :checkbox").click(function () {
            if($(this).is(":checked")){
                $("#filter :checkbox:checked").each(function(){
                    $("." + $(this).val()).parent().parent(".branch").show();
                })
            } else {
                $("#filter :checkbox").each(function(){
                    $("." + $(this).val()).parent().parent(".branch").hide();
                })
            }





        });


    }).success(function() {
        console.log("Successfully retrieved data.");
    }).error(function() {
        console.log("Service Unavailable.");
    });


})
