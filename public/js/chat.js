var host;
var port;
var socket;

//문서 로딩 후 실행
$(function(){
    //연결하기
    $("#connectButton").bind('click', function(event){
        host = $("#hostInput").val();
        port = $("#portInput").val();
        document.getElementById('disappear').style.display = 'none';
        document.getElementById('disappear2').style.display = 'none';

        var name = $("#nickname").val();
        $("#result").append(name+' 님이 입장하셨습니다.');


        // function println(data){     //책에서는 여기에 println함수 안써줬음. 왜 안되나 한참 찾음.
        //     console.log(data);
        //     $('#result').append('<p>'+data+'</p>')
        // }

        connectToServer();
    })

    //전송 버튼을 클릭하면 처리
    $("#sendButton").bind('click', function(event){
        // var sender = $('#nickname').val();
        var recepient = $('#recepientInput').val();
        var data = $('#dataInput').val();

        // var output = {sender:sender, recepient:recepient, command:'chat', type:'text', data:data}
        var output = {recepient:recepient, data:data}
        console.log('서버로 보낼 데이터:'+JSON.stringify(output));

        if(socket == undefined){
            alert('서버에 연결되어 있지 않습니다.')
            return;
        }
        
        socket.emit('message', output);
    })

})


//서버에 연결하는 함수 정의
function connectToServer(){
    var name = $("#nickname").val();

    var options = {'forceNew': true};
    var url = 'http://'+host+':'+port;
    socket = io.connect(url, options);

    socket.on('connect', function(){
        console.log('소켓 연결 완료')
        //println('웹 소켓 서버에 연결됨'+ url);

        socket.on('message', function(message){
            console.log(JSON.stringify(message));
            // println('<p>수신 메시지:'+message.sender+','+message.recepient+','+message.command+','+message.type+','+message.data+'</p>')
            println('<p>'+name+': '+message.data+'</p>')
        })
    })

    socket.on('disconnect', function(){
        println('웹 소켓 연결 종료');
    })

    function println(data){
        console.log(data);
        $('#result').append('<p>'+data+'</p>')
    }
}
