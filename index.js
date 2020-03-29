/* global
$
*/

$.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
   console.log($('.latitude'));
   $('.latitude').empty().append(data.iss_position.latitude);
   $('.longitude').empty().append(data.iss_position.longitude);
   function initMap () {
      var myLatLng = {
         lat: +data.iss_position.latitude,
         lng: +data.iss_position.longitude
      };
      var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
         center: myLatLng
      });
      let arrMarkers = [];
      var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         title: 'Hello World!'
      });
      arrMarkers.push(marker);
      function replay () {
         $.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
            console.log($('.latitude'));
            $('.latitude').empty().append(data.iss_position.latitude);
            $('.longitude').empty().append(data.iss_position.longitude);
            myLatLng = {
               lat: +data.iss_position.latitude,
               lng: +data.iss_position.longitude
            };
            function removeMarkers () {
               for (let i = 0; i < arrMarkers.length; i++) {
                  arrMarkers[i].setMap(null);
               }
               arrMarkers = [];
            }
            removeMarkers();
            marker = new google.maps.Marker({
               position: myLatLng,
               map: map,
               title: 'Hello World!'
            });
            arrMarkers.push(marker);
         });
         $(function () {
            const time = new Date();
            console.log(time);
            $('.time').empty();
            $('.time').append(time.getUTCHours());
            if (time.getUTCMinutes() < 10) {
               $('.time').append(':0' + time.getUTCMinutes());
            } else {
               $('.time').append(':' + time.getUTCMinutes());
            }
            const daysArr = [
               'sunday',
               'Monday',
               'Tuesday',
               'Wednesday',
               'Thursday',
               'Friday',
               'Saturday'
            ];
            const monthsArr = [
               'Jan',
               'Feb',
               'Mar',
               'Apr',
               'May',
               'Jun',
               'Jul',
               'Aug',
               'Sep',
               'Oct',
               'Nov',
               'Dec'
            ];
            const dataDay = time.getUTCDay();
            const dataMonth = time.getUTCMonth();
            $('.date i').empty().append(daysArr[dataDay] + ', ' + time.getUTCDate() + ' ' + monthsArr[dataMonth] + ' ' + time.getUTCFullYear());
            $.getJSON('http://api.open-notify.org/astros.json', function (data) {
               console.log(data.people);
               const people = data.people;
               let countPeople = 0;
               $('.people ul').empty();
               for (let i = 0; i < people.length; i++) {
                  if (people[i].craft === 'ISS') {
                     $('.people ul').append('<li class="listItem">' + people[i].name + '</li>');
                     countPeople++;
                  }
               }
               $('.total').empty().append(' ' + countPeople + ' ');
            });
         });
      }
      replay();
      setInterval(replay, 5000);
   }
   initMap();
});
