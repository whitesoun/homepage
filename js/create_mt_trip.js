// HTML 본문에 <table id="trips_table"> </table>이 존재해야 함
// json 파일은 동적으로 받을 수 있도록 한다.
// 사용법; 
//		<div id="mt_trip_list" class="mt_trip_table">
//		</div>
//
//		<script>
//			let requestURL = 'https://whitesoun.github.io/homepage/json/mt1708_seorak.json';
//		</script>
//		<script src = "js/create_mt_trip.js"></script>


//    let requestURL = 'https://whitesoun.github.io/homepage/json/mt1708_seorak.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      const jsonTrips = request.response;
      ShowTirps(jsonTrips);

    }

    
    // 2021-09-29, 등산기록 json 파일을 읽어 표 형태로 보여준다.
    function ShowTirps(obj) {
        // 표 만들기 테스트
        const table = document.getElementById('mt_trip_list');
        let i = 0;
        for(i = 0; i < obj.length; i++) {
			var divRow = document.createElement("div");
			var tdCol1 = document.createElement("div");
			var tdCol2 = document.createElement("div");
			
			divRow.className = "mt_trip_row";
			tdCol1.className = "mt_trip_col1";
			tdCol2.className = "mt_trip_col2";

			// 월은 특이하게도 0~11의 범위를 가진다. 내가 사용할 때 +1을 해 줘야 한다.
			const start_date = new Date(obj[i].start_date);
			const year = start_date.getFullYear(); 
			const month = start_date.getMonth()+1;
			const date = start_date.getDate();
			
			// *****?????innerHTML은 표준은 아니라고 하나, 줄바꿈은 이 방법 밖에 안됨
			//  연월일을 써준다. 필요시 URL 연결
			if(obj[i].google_photo_url) {
				tdCol1.innerHTML = '<a href="' + obj[i].google_photo_url + '" target="_blank">'
					             + year+'년<br>'+month+'월 '+date+'일</a>';
			}
			else {
				tdCol1.innerHTML = year+'년<br>'+month+'월 '+date+'일';
			}
			if(obj[i].trip_days > 1) {
				tdCol1.innerHTML += "<br>(" + String(obj[i].trip_days-1)+ "박" + String(obj[i].trip_days) + "일)";
			}

			// 두번째 컬럼: 등산 경로, 지도상의 경로 색깔, 거리, 시간을 보여준다.
			var line2_1;	// 두번째 컬럼: 등산 경로, 지도상의 경로 색깔, 거리, 시간을 보여준다.
			var line2_2;	// 두번째 컬럼: 획득고도 또는 최고점
			var sDistance;	// 걸리에 램블러 URL을 연결하기 위한 변수
			
			// 램블러 URL이 있으면 거리에 링크를 걸어 준다.
			if(obj[i].rambler_url) {
				sDistance = '<a href="' + obj[i].rambler_url + '" target="_blank">' + obj[i].distance + '</a>'; 
			}
			else {
				sDistance = obj[i].distance; 
			}
			line2_1 = '<img src="../images/images_deco/' + obj[i].path_color + '.gif" width=30 height=5> '
			  + sDistance + ', ' + obj[i].trip_time;

			// 두번째 컬럼: 획득고도
			if(obj[i].height_earned) {
				line2_2 = ', 획득고도: ' + obj[i].height_earned;
			}
			else if(obj[i].max_height) {
				line2_2 = ', 최고점: ' + obj[i].max_height;
			}
			else {
				line2_2 = "";
			}
			
			tdCol2.innerHTML = obj[i].path + '<br>' + line2_1 + line2_2;
			
			divRow.appendChild(tdCol1);
			divRow.appendChild(tdCol2);
			table.appendChild(divRow);
		} // for i
        
        // 총 건수를 보여준다.
		var divRow = document.createElement("div");
		var divCol1 = document.createElement("div");
		var divCol2 = document.createElement("div");
		divRow.className = "mt_trip_row";
		divCol1.className = "mt_trip_col1_count";
		divCol2.className = "mt_trip_col2_count";
//		divRow.style.textAlign = "center";

		divCol2.appendChild(document.createTextNode('총 '+ String(i) + '회'));
		
		divRow.appendChild(divCol1);
		divRow.appendChild(divCol2);
		table.appendChild(divRow);
    }
