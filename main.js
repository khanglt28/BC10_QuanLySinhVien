//Tạo đối tượng dssv từ lớp đối tượng DanhSachSinhVien
var dssv = new DanhSachSinhVien();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

// lấy data từ localStorage:
getLocalStorage();

function layDuLieuDauVao(isAdd) {
  //Lấy các thông tin từ users nhập vào thông qua các thẻ input
  var _maSV = getEle("txtMaSV").value;
  var _tenSV = getEle("txtTenSV").value;
  var _email = getEle("txtEmail").value;
  var _matKhau = getEle("txtPass").value;
  var _ngaySinh = getEle("txtNgaySinh").value;
  var _khoaHoc = getEle("khSV").value;
  var _diemToan = getEle("txtDiemToan").value;
  var _diemLy = getEle("txtDiemLy").value;
  var _diemHoa = getEle("txtDiemHoa").value;

  /**
   * Validate inputs
   */
  // Nếu isValid = true => cho phép thêm SV;
  var isValid = true;
  if (isAdd === true) {
    isValid &=
      validation.kiemTraRong(
        _maSV,
        "divMaErr",
        "(*) Mã sinh viên không được để trống"
      ) &&
      validation.kiemTraDoDaiKyTu(
        _maSV,
        "divMaErr",
        "(*) Độ dài ký tự từ 4-10",
        4,
        10
      ) &&
      validation.kiemTraMaSVTrung(
        _maSV,
        "divMaErr",
        "(*) Mã sinh viên đã tồn tại",
        dssv.list
      );
  }

  isValid &=
    validation.kiemTraRong(
      _tenSV,
      "divTenErr",
      "(*) Tên sinh viên không được để trống"
    ) &&
    validation.kiemTraKyTuChuoi(
      _tenSV,
      "divTenErr",
      "(*) Tên sinh viên không được có ký tự đặc biệt hoặc số"
    );

  isValid &= validation.kiemTraRong(
    _email,
    "divEmailErr",
    "(*) Email không được để trống"
  );

  isValid &= validation.kiemTraRong(
    _matKhau,
    "divMatKhauErr",
    "(*) Mật khẩu không được để trống"
  );

  isValid &= validation.kiemTraRong(
    _ngaySinh,
    "divNgaySinhErr",
    "(*) Ngày sinh không được để trống"
  );

  isValid &= validation.kiemTraKhoaHoc(
    "khSV",
    "divKHErr",
    "(*) Vui lòng chọn khóa học"
  );

  isValid &= validation.kiemTraRong(
    _diemToan,
    "divToanErr",
    "(*) Điểm không được để trống"
  );

  isValid &= validation.kiemTraRong(
    _diemHoa,
    "divHoaErr",
    "(*) Điểm không được để trống"
  );

  isValid &= validation.kiemTraRong(
    _diemLy,
    "divLyErr",
    "(*) Điểm không được để trống"
  );

  //Tạo đối tượng sinh viên
  if (isValid) {
    var sinhVien = new SinhVien(
      _maSV,
      _tenSV,
      _email,
      _matKhau,
      _ngaySinh,
      _khoaHoc,
      _diemToan,
      _diemLy,
      _diemHoa
    );
    return sinhVien;
  }
  return null;
}
/**
 * Thêm sinh viên
 */

//cách 1: DOM id button
// getEle("btnAdd").onclick = function () {
//   console.log("123");
// };

//cách 2: callback function: tham số của 1 hàm là 1 hàm khác
getEle("btnAdd").addEventListener("click", function (event) {
  // chặn trang web bị load lại trong form
  event.preventDefault();
  var sinhVien = layDuLieuDauVao(true);
  // Kiển tra nếu inputs hợp lệ mới cho add SV
  if (sinhVien !== null) {
    sinhVien.tinhDTB();
    dssv.themSinhVien(sinhVien);
    taoBang(dssv.list);

    // Lưu mảng list xuống localStorage
    setLocalStorage();
  }
  // console.log(dssv.list);
});

function taoBang(arr) {
  //reset tbody
  getEle("tbodySinhVien").innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    // Tạo dòng (tr)
    var tagTR = document.createElement("tr");

    // Tạo cột (td) - 6 cột
    var tagTD_MaSV = document.createElement("td");
    var tagTD_TenSV = document.createElement("td");
    var tagTD_Email = document.createElement("td");
    var tagTD_NgaySinh = document.createElement("td");
    var tagTD_KhoaHoc = document.createElement("td");
    var tagTD_DiemTB = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");

    // Tạo nội dung cho 6 cột
    tagTD_MaSV.innerHTML = arr[i].maSV;
    tagTD_TenSV.innerHTML = arr[i].tenSV;
    tagTD_Email.innerHTML = arr[i].email;
    tagTD_NgaySinh.innerHTML = arr[i].ngaySinh;
    tagTD_KhoaHoc.innerHTML = arr[i].khoaHoc;

    //Thực thi phương thức tinhDTB
    // arr[i].tinhDTB();
    tagTD_DiemTB.innerHTML = arr[i].diemTB;
    tagTD_Button_Edit.innerHTML =
      '<button class="btn btn-info" onclick="suaSinhVien(\'' +
      arr[i].maSV +
      "')\">Sửa</button>";
    tagTD_Button_Delete.innerHTML =
      '<button class="btn btn-danger" onclick="xoaSinhVien(\'' +
      arr[i].maSV +
      "')\">Xóa</button>";

    //appendChild 6 cột vào dòng
    tagTR.appendChild(tagTD_MaSV);
    tagTR.appendChild(tagTD_TenSV);
    tagTR.appendChild(tagTD_Email);
    tagTR.appendChild(tagTD_NgaySinh);
    tagTR.appendChild(tagTD_KhoaHoc);
    tagTR.appendChild(tagTD_DiemTB);
    tagTR.appendChild(tagTD_Button_Edit);
    tagTR.appendChild(tagTD_Button_Delete);

    //appendChild dòng vào tbody
    getEle("tbodySinhVien").appendChild(tagTR);
  }
}

/**
 * Xoá Sinh Viên
 */
function xoaSinhVien(maSV) {
  // console.log(maSV);
  dssv._xoaSinhVien(dssv.list);
  taoBang(dssv.list);
  setLocalStorage();
}

/**
 * Sửa sinh viên
 */
function suaSinhVien(maSV) {
  var sinhVien = dssv.layThongTinSinhVien(maSV);
  // Mở lại nút cập nhật
  getEle("btnUpdate").style.display = "inline-block";

  //DOM tới các thẻ inputs và show values
  getEle("txtMaSV").value = sinhVien.maSV;
  getEle("txtMaSV").disabled = true;
  getEle("txtTenSV").value = sinhVien.tenSV;
  getEle("txtEmail").value = sinhVien.email;
  getEle("txtPass").value = sinhVien.matKhau;
  getEle("txtNgaySinh").value = sinhVien.ngaySinh;
  getEle("khSV").value = sinhVien.khoaHoc;
  getEle("txtDiemToan").value = sinhVien.diemToan;
  getEle("txtDiemLy").value = sinhVien.diemLy;
  getEle("txtDiemHoa").value = sinhVien.diemHoa;
}

/**
 * Cập nhật sinh viên
 */
getEle("btnUpdate").addEventListener("click", function () {
  //Lấy các thông tin từ users nhập vào thông qua các thẻ input
  var sinhVien = layDuLieuDauVao(false);
  sinhVien.tinhDTB();
  dssv.capNhatSinhVien(sinhVien);
  taoBang(dssv.list);

  // Đồng bộ localStorage
  setLocalStorage();
  // console.log(sinhVien);
});

/**
 * Reset Form button
 */
getEle("btnReset").addEventListener("click", function () {
  getEle("formSV").reset();
  getEle("btnUpdate").style.display = "none";
  getEle("txtMaSV").disabled = false;

  //DOM tới div show Error reset:
});

/**
 * Tìm kiếm sinh viên
 */
getEle("txtSearch").addEventListener("keyup", function (keyword) {
  var keyword = getEle("txtSearch").value;
  var mangTimKiem = dssv.timKiemSinhVien(keyword);
  taoBang(mangTimKiem);
});

function setLocalStorage() {
  // chuyển kiểu JSON => String (JSON.stringify)
  var arrString = JSON.stringify(dssv.list);
  localStorage.setItem("DSSV", arrString);
}

function getLocalStorage() {
  // chuyển từ kiểu String => JSON
  if (localStorage.getItem("DSSV")) {
    var data = localStorage.getItem("DSSV");
    dssv.list = JSON.parse(data);
    taoBang(dssv.list);
  }
}
