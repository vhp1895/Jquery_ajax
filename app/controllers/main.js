// Dam bao html render ra het' moi chay function ben trong
$(document).ready(function() {
    var nguoiDungService = new NguoiDungService();

    layDanhSachNguoiDung();

    function getInput(title, btnTitle, btnID) {
        $('.modal-title').html(title);
        var footer = 
        `
            <button id="${btnID}" class="btn btn-success">${btnTitle}</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        `

        $('.modal-footer').html(footer);
    }

    $('#btnThemNguoiDung').click(function() {
        getInput("Them Nguoi Dung", 'Them', 'btnThem');
    })

    $('body').delegate('.btnSua', 'click', function() {
        getInput("Sua nguoi dung", 'Cap Nhat', 'btnCapNhat');
    })
    
    $('body').delegate('#btnThem', 'click', function() {
        var taiKhoan = $('#TaiKhoan').val();
        var hoTen = $('#HoTen').val();
        var matKhau = $('#MatKhau').val();
        var email = $('#Email').val();
        var soDT = $('#SoDienThoai').val();
        var loaiNguoiDung = $('#loaiNguoiDung').val();

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung);
        
        nguoiDungService.themNguoiDung(nguoiDung);
    })

    $('body').delegate('.btnXoa', 'click', function() {
        var taiKhoan = $('this').data('taikhoan');
        console.log(taiKhoan);
        nguoiDungService.xoaNguoiDung(taiKhoan);
        console.log('xoa');
    })

    $('#txtTimKiem').keyup(function() {
        var mangTimKiem = [];
        var taiKhoan = $('#txtTimKiem').val();
        nguoiDungService.timKiemNguoiDung(taiKhoan);
        taoBang(mangTimKiem);
    })

    function layDanhSachNguoiDung() {
        nguoiDungService.layDanhSachNguoiDung()
        .done(function(result) {
            taoBang(result);
            localStorage.setItem('danhSachNguoiDung', JSON.stringify(result));
        })
        .fail(function(err) {
            console.log(err);
        })
    }

    function taoBang(DanhSachNguoiDung) {
        var tblBody = "";
    
        DanhSachNguoiDung.map(function(item, index) {
            tblBody +=
            `
            <tr>
                <td>${index + 1}</td>
                <td>${item.TaiKhoan}</td>
                <td>${item.MatKhau}</td>
                <td>${item.HoTen}</td>
                <td>${item.Email}</td>
                <td>${item.SoDT}</td>
                <td>${item.TenLoaiNguoiDung}</td>
                <td>
                    <button class="btn btn-success btnSua" data-toggle="modal" data-target="#myModal">Sua</button>
                    <button class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xoa</button>
                </td>
            </tr>
            `
        })
     
        $('#tblDanhSachNguoiDung').html(tblBody);
    }
})