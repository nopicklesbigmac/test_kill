let index = {
    init: function() {
        document.getElementById('email').addEventListener('input', index.validateInputs);
        document.getElementById('name').addEventListener('input', index.validateInputs);
        document.getElementById('username').addEventListener('input', index.validateInputs);
        document.getElementById('password').addEventListener('input', index.validateInputs);

        $("#btn-join").on("click", () => {
            this.join();
        });
    },

    // 챗GPT야 고마워
    validateInputs: function() {
        var emValue = document.getElementById('email').value;
        var nameValue = document.getElementById('name').value;
        var usrValue = document.getElementById('username').value;
        var passwordValue = document.getElementById('password').value;
        var joinButton = document.getElementById('btn-join');
        var joinText = document.getElementById('joinText');

        // 길이가 6글자 이상인 경우에만 버튼 활성화
        joinButton.disabled = emValue.length < 1 || usrValue.length < 1 || passwordValue.length < 6;

        // 버튼이 활성화되었을 때 텍스트 색상 변경
        if (!joinButton.disabled) {
            joinText.style.color = '#ffffff'; // 원하는 활성화 텍스트 색상으로 변경
        } else {
            joinText.style.color = ''; // 기본 텍스트 색상으로 변경 (스타일 시트에서 정의한 값)
        }
    },

    facebookJoinClick: function() {
        var imageElement = document.getElementById("facebookJoin");
        imageElement.src = "/image/join/facebook2.png";
    },
    facebookJoinMouseUp: function () {
        var imageElement = document.getElementById("facebookJoin");
        imageElement.src = "/image/join/facebook.png";
    },

    join: function() {
        // 기존 메시지 삭제
        var params = {
            email: $("#email").val(),
            name: $("#name").val(),
            username: $("#username").val(),
            password: $("#password").val()
        }
    
        var existingMessage = document.getElementById('ErrorMessage');
        if (existingMessage) {
            existingMessage.remove();
        }
 let data = {
            email: $("#email").val(),
            name: $("#name").val(),
            username: $("#username").val(),
            password: $("#password").val()
        }

        // 메시지 추가
        var ErrorMessageSpan = document.createElement('span');
        if (isNaN(data.email) && !data.email.includes('@')) { // 이메일에 @가 포함되지 않은 경우
            ErrorMessageSpan.id = 'ErrorMessage';
            ErrorMessageSpan.textContent = 'Enter a valid email address.';
            ErrorMessageSpan.style.color = '#ff4857';
            ErrorMessageSpan.style.fontSize = '14px';
//      } else if (!(/[A-Z]/.test(data.password) && /[0-9]/.test(data.password)&& /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(data.password) )) {
        } else if (data.password.length < 6) {
            ErrorMessageSpan.id = 'ErrorMessage';
            ErrorMessageSpan.textContent = '이 비밀번호는 추측하기가 너무 쉽습니다.새로운 비밀번호를 만드세요.';
            ErrorMessageSpan.style.color = '#ff4857';
            ErrorMessageSpan.style.fontSize = '14px';
        } else {
		    $.ajax({
	                type : "POST",            // HTTP method type(GET, POST) 형식이다.
	                url : "/joinProc",      // 컨트롤러에서 대기중인 URL 주소이다.
	                data :  JSON.stringify(params),            // Json 형식의 데이터이다.
	                contentType: "application/json; charset=utf-8", // Content-Type 설정
	                success : function(res){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
	                    if(res.code==true){
							swal({
							title : "가입 성공!",
						    icon  : "success",
						    closeOnClickOutside : false
							}).then(function(){
								location.href = "/";
							});
						}else{
							ErrorMessageSpan.id = 'ErrorMessage';
							ErrorMessageSpan.textContent = res.code;
							ErrorMessageSpan.style.color = '#ff4857';
							ErrorMessageSpan.style.fontSize = '14px';
						}
	                },
	                error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
	                    alert("통신 실패.")
	                }
	            });
        // 메시지 추가
        }

        // 메시지를 표시할 요소 찾기
        var firstBigBox = document.getElementById('OneBorder');

        // 메시지 추가
        firstBigBox.appendChild(ErrorMessageSpan);
    }
}

index.init();