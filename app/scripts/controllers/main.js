'use strict';

/**
 * @ngdoc function
 * @name pollUpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pollUpApp
 */
angular.module('pollUpApp')
    .controller('MainCtrl', function($scope, $timeout, $firebase) {

        //firebase setup
        var ref = new Firebase("https://poll-up.firebaseio.com/");
        var sync = $firebase(ref);

        //end of firebase setup
        $scope.currentAddPoll = [{
            value: ''
        }, {
            value: ''
        }];

        //get data from firebase
        $scope.allPoll = sync.$asArray();
        
        $scope.selected = "input";
        $scope.pollQuestionAdd = "";

        $scope.addOption = function() {
            var newObject = {
                value: ''
            }
            $scope.currentAddPoll.push(newObject);
        };

        $scope.addPoll = function() {
            var title = $scope.pollQuestionAdd;
            var intValue = [];
            var titleValue = [];

            for (var i = 0; i < $scope.currentAddPoll.length; i++) {
                titleValue.push($scope.currentAddPoll[i].value);
                intValue.push(0);
            };

            var beforeObject = {
                labels: titleValue,
                datasets: [{
                    fillColor: "rgba(72,209,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: intValue
                }]
            };

            var endObject = {
            	name: title,
            	allTitleValue: titleValue,
            	graph: beforeObject
            }

            // $scope.allPoll.push(endObject);
            // console.log($scope.allPoll);

            $scope.allPoll.$add(endObject);

            $scope.currentAddPoll = [{
                value: ''
            }, {
                value: ''
            }];

            $scope.pollQuestionAdd = ""
        };

        $scope.clearPoll = function() {
            $scope.currentAddPoll = [{
                value: ''
            }, {
                value: ''
            }];

            $scope.pollQuestionAdd = ""
        };

        $scope.submitAnswer = function(qIndex) {
            var answerIndex = document.querySelector('input[name="radio"]:checked').value;
            var questionIndex = qIndex;
            console.log("answerIndex is " + answerIndex);
            console.log("questionIndex is " + questionIndex);

            $scope.allPoll[questionIndex].graph.datasets[0].data[answerIndex]++;
            $scope.allPoll.$save(questionIndex);
        };


        $scope.options = {
            // Boolean - Whether to animate the chart
            animation: false,

            // Number - Number of animation steps
            animationSteps: 60,

            // String - Animation easing effect
            animationEasing: "easeOutQuart",

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: false,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: null,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: null,
            // Number - The scale starting value
            scaleStartValue: null,

            // String - Colour of the scale line
            scaleLineColor: "rgba(0,0,0,.1)",

            // Number - Pixel width of the scale line
            scaleLineWidth: 1,

            // Boolean - Whether to show labels on the scale
            scaleShowLabels: true,

            // Interpolated JS string - can access value
            scaleLabel: "<%=value%>",

            // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
            scaleIntegersOnly: true,

            // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: false,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Scale label font size in pixels
            scaleFontSize: 12,

            // String - Scale label font weight style
            scaleFontStyle: "normal",

            // String - Scale label font colour
            scaleFontColor: "#666",

            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: false,

            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: true,

            // Boolean - Determines whether to draw tooltips on the canvas or not
            showTooltips: true,

            // Array - Array of string names to attach tooltip events
            tooltipEvents: ["mousemove", "touchstart", "touchmove"],

            // String - Tooltip background colour
            tooltipFillColor: "rgba(0,0,0,0.8)",

            // String - Tooltip label font declaration for the scale label
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip label font size in pixels
            tooltipFontSize: 14,

            // String - Tooltip font weight style
            tooltipFontStyle: "normal",

            // String - Tooltip label font colour
            tooltipFontColor: "#fff",

            // String - Tooltip title font declaration for the scale label
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip title font size in pixels
            tooltipTitleFontSize: 14,

            // String - Tooltip title font weight style
            tooltipTitleFontStyle: "bold",

            // String - Tooltip title font colour
            tooltipTitleFontColor: "#fff",

            // Number - pixel width of padding around tooltip text
            tooltipYPadding: 6,

            // Number - pixel width of padding around tooltip text
            tooltipXPadding: 6,

            // Number - Size of the caret on the tooltip
            tooltipCaretSize: 8,

            // Number - Pixel radius of the tooltip border
            tooltipCornerRadius: 6,

            // Number - Pixel offset from point x to tooltip edge
            tooltipXOffset: 10,

            // String - Template string for single tooltips
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

            // String - Template string for single tooltips
            multiTooltipTemplate: "<%= value %>",

            // Function - Will fire on animation progression.
            onAnimationProgress: function() {},

            // Function - Will fire on animation completion.
            onAnimationComplete: function() {}
        }

    });