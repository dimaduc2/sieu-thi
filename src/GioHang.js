import React, { useEffect, useState } from 'react';
import { Image, Popover, Row, Col, Table, Button, } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";
function GioHang({danhSachGioHang, TangGiamGio, tongGio, XoaGioHang, tongGiaTien, XoaTatCaGioHang, ThanhToan}) {

  useEffect(() => {})
  return (
    <div>

      {danhSachGioHang.length===0
        ?<a>Giỏ hàng của bạn còn trống<br/><Button as={Link} to="/SanPham">Tìm sản phẩm</Button></a>
        :
        <Table>
          <thead>
            <tr>
              <th>Ảnh thứ ăn</th>
              <th>Tên</th>
              <th>Giá tiền</th>
              <th>Số lượng trong giỏ hàng</th>
              <th>Bỏ khỏi giỏ hàng</th>
              <th>Tổng mỗi SP</th>
            </tr>
          </thead>
          <tbody>
            {danhSachGioHang.map((moiSanPham, index)=>
              <tr>
                <td><Image src={moiSanPham.DiaChiAnh} style={{width: '50px'}}/></td>
                <td>{moiSanPham.Ten}</td>
                <td>{moiSanPham.GiaTien} đ</td>
                <td><Button onClick={() => TangGiamGio(-1, moiSanPham.id)} variant="danger">-</Button> {moiSanPham.soLuongTrongGio} <Button onClick={() => TangGiamGio(1, moiSanPham.id)} variant="danger">+</Button></td>
                <td><Button onClick={() => XoaGioHang(moiSanPham.id, moiSanPham.soLuongTrongGio)} variant="danger">X</Button></td>
                <td>{moiSanPham.GiaTien * moiSanPham.soLuongTrongGio} đ</td>
              </tr>
            )}
            <tr>
              <td></td>
              <td></td>
              <td>
                {tongGiaTien}
              </td>
              <td>{tongGio}</td>
              <td></td>
              <td>
                <Button onClick={() => ThanhToan()} variant="danger">Thanh Toan</Button>
              </td>
            </tr>
            <tr>
              <td><Button onClick={() => XoaTatCaGioHang()} variant="danger">Xóa tất cả giỏ hàng</Button></td>
            </tr>
          </tbody>
        </Table>
      }



    </div>
  );
}
export default GioHang;