function DanhSachSinhVien() {
  this.list = [];

  this.themSinhVien = function (sv) {
    this.list.push(sv);
  };

  this._timViTri = function (maSV) {
    /**
     ** Tìm vị trí maSV muốn xoá thông qua mảng
     * 0. var index = -1;
     * 1. Duyệt mảng this.list
     * 2. Nếu item.maSV == maSV lấy index(i)     *
     * 3. splice(index, 1);
     */
    var index = -1;
    for (i = 0; i < this.list.length; i++) {
      if (this.list[i].maSV == maSV) {
        index = i;
        // break;
        return index;
      }
    }
  };

  this._xoaSinhVien = function (maSV) {
    var index = this._timViTri(maSV);
    // Xoá SV
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  };

  this.layThongTinSinhVien = function (maSV) {
    // Lấy vị trí
    var index = this._timViTri(maSV);
    if (index !== -1) {
      return this.list[index];
    }
  };

  this.capNhatSinhVien = function (sinhVien) {
    var index = this._timViTri(sinhVien.maSV);
    if (index != -1) {
      this.list[index] = sinhVien;
    }
  };

  // this.timKiemSinhVien = function (keyword) {

  // }
}

// viết phương thức tách biệt khỏi đối tương DanhSachSinhVien()
DanhSachSinhVien.prototype.timKiemSinhVien = function (keyword) {
  /**
   * 0. Tạo mảng tìm kiếm rỗng = [];
   * 1. Duyệt mảng list
   * 2. Nếu keyword trùng với sinhVien.tenSV => tìm thấy : Thêm SV vào mảng tìm kiếm
   * 3. Return mảng tìm kiếm
   */
  var searchArr = [];
  for (var i = 0; i < this.list.length; i++) {
    if (this.list[i].tenSV.toLowerCase().indexOf(keyword.toLowerCase())) {
      searchArr.push(this.list[i]);
    }
  }
  return searchArr;
};
