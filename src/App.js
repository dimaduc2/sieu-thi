import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Dropdown, Form, FormControl, Button, Image, OverlayTrigger, Popover, Tooltip, Row, Col, 
  Modal} from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import Home from './Home.js'
import SanPham from './SanPham.js'
import GioHang from './GioHang.js'
import XeDay from './XeDay.jpg'

import { BiCart } from "react-icons/bi";


function App(){
  const [diaChi, sua_diaChi] = useState([]);
  const [tenThucAn, sua_tenThucAn] = useState('');
  const [danhSachSanPham, sua_danhSachSanPham] = useState([]);
  const [mauSang, thayDoiMauSang] = useState(true);
  const doiMau = () => thayDoiMauSang(!mauSang);
  const [thongBao, suaThongBao] = useState('');
  const [signDachon, suaSignDachon] = useState(null);

  var diaChiServer = process.env.REACT_APP_DIACHI_SERVER
  const chaoHoi = (sdfg) => {
    var thongTin = {
      LoaiCa: 'Cá',
      LoaiThit: 'Thịt',
      LoaiRau: 'Rau'
    }
    console.log('diaChiServer: ', diaChiServer)

    axios.post('http://'+diaChiServer+'/chaoHoi?guiChaoHoi='+sdfg, thongTin)
    .then(res => {
      // alert('tên ' + res.data[0].ten + ' sống ở địa chỉ là ' + res.data[0].diaChi + 
      //   ' || tên ' + res.data[1].ten + ' sống ở địa chỉ là ' + res.data[1].diaChi)
      console.log('res.data: ', res.data)
      sua_diaChi(res.data)
    })
    .catch((error) => {
       console.log(error);
     });
  }
  
  const vietTenThucAn = (tenThucAn) => {
    sua_tenThucAn(tenThucAn)
    // alert(tenThucAn)
    axios.get('http://'+diaChiServer+'/SanPham')
    .then(res => {
      console.log('res.data: ', res.data)
      sua_danhSachSanPham(res.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const coHang = () => {
    alert('Có hàng.')
  }

  
  const [tongGiaTien, sua_TongGiaTien] = useState(0);
  const [tongGio, sua_TongGio] = useState(0);
  const [danhSachGioHang, sua_DanhSachGioHang] = useState([]);

  const themVaoGio = (soLuongThemVaoGio, idSanPham) => {
    for (let i = 0; i < danhSachSanPham.length; i++){
      if(Number(danhSachSanPham[i].id) === Number(idSanPham)){
        var daTimThay = false
        for (let j = 0; j < danhSachGioHang.length; j++){
          if(danhSachGioHang[j].id===danhSachSanPham[i].id){    
            daTimThay = true
            if(Number(danhSachGioHang[j].soLuongTrongGio) < Number(danhSachSanPham[i].SoLuongTrongKho)){
              danhSachGioHang[j].soLuongTrongGio = danhSachGioHang[j].soLuongTrongGio + soLuongThemVaoGio
              sua_TongGio(tongGio + soLuongThemVaoGio)
              sua_TongGiaTien(tongGiaTien + danhSachSanPham[i].GiaTien)
            }else if(danhSachGioHang[j].soLuongTrongGio+soLuongThemVaoGio > danhSachSanPham[i].SoLuongTrongKho){
              alert('Hết hàng')
            }
            break
          }
        }
        if(daTimThay===false){
          danhSachGioHang.push({id: danhSachSanPham[i].id, DiaChiAnh: danhSachSanPham[i].DiaChiAnh, Ten: danhSachSanPham[i].Ten, 
          GiaTien: danhSachSanPham[i].GiaTien, soLuongTrongGio: soLuongThemVaoGio, SoLuongTrongKho: danhSachSanPham[i].SoLuongTrongKho})
          sua_TongGio(tongGio + soLuongThemVaoGio)
          sua_TongGiaTien(tongGiaTien + danhSachSanPham[i].GiaTien)
        }
        sua_DanhSachGioHang(danhSachGioHang)
      }
    }
  }

  const TangGiamGio = (TangGiamKhoiLuong, id) => {
    for (let i = 0; i < danhSachGioHang.length; i++){
      if(Number(danhSachGioHang[i].id) === Number(id)){
        var danhSachGioHangMoi = [...danhSachGioHang]
        if(danhSachGioHang[i].soLuongTrongGio+TangGiamKhoiLuong > danhSachGioHang[i].SoLuongTrongKho){
            alert('Hết hàng')
        }else if(danhSachGioHang[i].soLuongTrongGio+TangGiamKhoiLuong === 0){
          danhSachGioHangMoi.splice(i, 1);
          sua_TongGio(tongGio + TangGiamKhoiLuong)
          sua_TongGiaTien(tongGiaTien + danhSachGioHang[i].GiaTien * TangGiamKhoiLuong)
          sua_DanhSachGioHang(danhSachGioHangMoi)
        }
        else{
          danhSachGioHangMoi[i].soLuongTrongGio = danhSachGioHang[i].soLuongTrongGio + TangGiamKhoiLuong
          sua_TongGio(tongGio + TangGiamKhoiLuong)
          sua_TongGiaTien(tongGiaTien + danhSachGioHang[i].GiaTien * TangGiamKhoiLuong)
          sua_DanhSachGioHang(danhSachGioHangMoi)
        }
        break
      }


    }
  }

  const XoaGioHang = (id, soLuongTrongGio) => {
    for (let i = 0; i < danhSachGioHang.length; i++){
      if(Number(danhSachGioHang[i].id) === Number(id)){
        var danhSachGioHangMoi = [...danhSachGioHang]
        danhSachGioHangMoi.splice(i, 1);
        sua_DanhSachGioHang(danhSachGioHangMoi)
        sua_TongGio(tongGio - soLuongTrongGio)
        sua_TongGiaTien(tongGiaTien - danhSachGioHang[i].GiaTien * soLuongTrongGio)
        break
      }
    }
  }

  const XoaTatCaGioHang = () => {
    sua_TongGio(0)
    sua_TongGiaTien(0)
    sua_DanhSachGioHang([])
  }
  
  const tinhTongGioHang = (gioHang) => {
    var tongKhoiLuong = 0
    for(var i=0; i<gioHang.length; i++){
      tongKhoiLuong+=gioHang[i].soLuongTrongGio
    }
    return tongKhoiLuong
  }
  const tinhTongGiaTien = (gioHang) => {
    var tongGiaTien = 0
    for(var i=0; i<gioHang.length; i++){
      tongGiaTien+=gioHang[i].GiaTien*gioHang[i].soLuongTrongGio
    }
    return tongGiaTien
  }


  const ThanhToan = () => {
    axios.post('http://'+diaChiServer+'/thanhToan', danhSachGioHang)
    .then(res => {
      alert(res.data)
      sua_TongGio(0)
      sua_TongGiaTien(0)
      sua_DanhSachGioHang([])
    })
    .catch(error => {
      alert(error.response.data.thongBao)
      console.log(error.response.data)
      var danhSachGioHangMoi = []
      for(let i = 0; i < danhSachGioHang.length; i++){
        if(danhSachGioHang[i].id === error.response.data.id){
          danhSachGioHangMoi = [...danhSachGioHang]
          danhSachGioHangMoi[i].soLuongTrongGio = error.response.data.soLuongConLai
          sua_TongGio(tinhTongGioHang(danhSachGioHangMoi))
          sua_TongGiaTien(tinhTongGiaTien(danhSachGioHangMoi))
        }
      }
      sua_DanhSachGioHang(danhSachGioHangMoi)
      

      // ban đầu có 5 thịt và tổng giỏ 10
      // sau đó sửa 2 thịt và tổng giỏ 7
    })
  }

  const [show, setShow] = useState(false);
  const [tenSignInUp, setTenSignInUp] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (SignInUp) => {
    setShow(true);
    setTenSignInUp(SignInUp);
  }
  
  
  const [UserDangViet, suaUserDangViet] = useState(null);
  const [PassDangViet, suaPassDangViet] = useState(null);
  const [PassDangViet2, suaPassDangViet2] = useState(null);
  
          
  const vietTenUser = (user) => {
    sessionStorage.setItem('user', user)
    suaUserDangViet(user)
  }
  const vietPassUser = (pass) => {
    sessionStorage.setItem('pass', pass)
    suaPassDangViet(pass)
  }
  const vietPassUser2 = (pass2) => {
    suaPassDangViet2(pass2)
  }


  const signIn = (user, pass) => {
    if(user==='' || pass===''){
      suaThongBao('Chưa có User hoặc Pass')
    }else{
      // alert('user: '+user+', pass: '+pass)
      var thongTinSignIn = {username: user, password: pass}
      axios.post('http://'+diaChiServer+'/SignIn', thongTinSignIn)
          .then(res => {
            alert(res.data[0].username)
            axios.get('http://'+diaChiServer+'/SanPham')
            suaSignDachon('daVao')
            setShow(false);
          })
          .catch((err) => {
            alert(err.response.data.thongBao)
          });
          
          // axios.get('http://'+diaChiServer+'/SanPham')
          // .then(res => {
          //   console.log('res.data: ', res.data)
          //   sua_danhSachSanPham(res.data)
          // })
          // .catch((error) => {
          //   console.log(error);
          // });

    }
  }

  const SignOut = () => {
    suaSignDachon(null)
    // setShow(true);
  }

  const signUp = () => {
    
    if(UserDangViet === '' || PassDangViet === '' || PassDangViet2 === ''){
      alert('Phải viết đầy đủ')
    }else{
      console.log(PassDangViet + ' & ' + PassDangViet2)
      if(PassDangViet === PassDangViet2){
        var thongTinSignUp = {username: UserDangViet, password: PassDangViet}
        axios.post('http://'+diaChiServer+'/SignUp', thongTinSignUp)
            .then(res => {
              alert(res.data)
            })
            .catch((err) => {
              alert(err.response.data.thongBao)
            });
        setShow(false);
      }else{
        alert('2 Pass phải giống nhau')
      }
    }

  }


  return (
    <div className="App">
      <header className="App-header" style={{background: mauSang ?'black' :'white', color: mauSang ?'white' :'black'}}>
        <Navbar bg={mauSang ?'dark' :'light'} variant={mauSang ?'dark' :'light'} expand="lg" fixed="top">
          <Navbar.Brand as={Link} to="/Home">Siêu Thị</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="Home">Siêu Thị</Nav.Link> */}
              <NavDropdown title="Danh mục sản phẩm" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/SanPham" onClick={() => vietTenThucAn('Thịt - Hải Sản Tươi')}>Thịt - Hải Sản Tươi </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/SanPham" onClick={() => vietTenThucAn('Rau - Trái Cây')}>Rau - Trái Cây</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/SanPham" onClick={() => vietTenThucAn('Đồ uống')}>Đồ uống</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/SanPham" onClick={() => vietTenThucAn('Bánh kẹo')}>Bánh kẹo</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          
          <BiCart onClick={() => coHang()}/>
          
          <OverlayTrigger 
          trigger="click" 
          placement="bottom" overlay={
            <Popover id="popover-basic">
              {danhSachGioHang.map((moiSanPham, index)=>
                <Popover.Body>
                  <Row>
                    <Col xs={3}><Image src={moiSanPham.DiaChiAnh} style={{width: '50px'}}/></Col>
                    <Col xs={9}>
                      {moiSanPham.Ten}
                      <br/>
                      Giá tiền: {moiSanPham.GiaTien * moiSanPham.soLuongTrongGio} đ
                      <br/>
                      x{moiSanPham.soLuongTrongGio}
                    </Col>
                  </Row>
                </Popover.Body>
              )}
              <Popover.Header as="h3">{tongGio} sản phẩm trong giỏ hàng</Popover.Header>
              {danhSachGioHang.length===0
                ?''
                :<a>
                  <Button as={Link} to="/GioHang" >Xem chi tiết</Button>
                  <Button onClick={() => ThanhToan()} variant="danger">Mua hàng</Button>
                </a>
              }
            </Popover>
          }>
            <a>Giỏ hàng ({tongGio})</a>
          </OverlayTrigger>

          <Form float="right">
            <Form.Check 
              type="switch"
              onChange={doiMau}
            />
          </Form>
          
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>

          {signDachon==='daVao'
          ?<Button onClick={() => SignOut('Sign Out')}>Sign out</Button>
          :<div><Button onClick={() => handleShow('Sign In')}>Sign in</Button>
          <Button onClick={() => handleShow('Sign Up')}>Sign up</Button></div>
          }
          

          


        </Navbar>
        
        
        

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {tenSignInUp}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>      
            
          {tenSignInUp === 'Sign In'
            ?<a>
              Tên:
              <Form.Control type='text' onChange={(event) => vietTenUser(event.target.value)} value={UserDangViet} />
              Mật khẩu:
              <Form.Control type='password' onChange={(event) => vietPassUser(event.target.value)} value={PassDangViet} />
              <Button onClick={() => signIn(UserDangViet, PassDangViet)}>{tenSignInUp}</Button>
            </a>
            :<a>
              Tên:
              <Form.Control type='text' onChange={(event) => vietTenUser(event.target.value)} value={UserDangViet} />
              Mật khẩu1:
              <Form.Control type='password' onChange={(event) => vietPassUser(event.target.value)} value={PassDangViet} />
              Mật khẩu2:
              <Form.Control type='password' onChange={(event) => vietPassUser2(event.target.value)} value={PassDangViet2} />
              <Button onClick={() => signUp()}>{tenSignInUp}</Button>
            </a>
          }

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        
        
        <Button onClick={() => chaoHoi('Xin Chào')}>Xin Chào</Button>
        {/* {danhSachSanPham} */}
        <br/><br/><br/>

        {/* {diaChi.map((moiHS, index)=><a>{('Tên ' + moiHS.ten + ' sống ở địa chỉ là ' + moiHS.diaChi)}</a>)} */}

        <Routes>
          <Route path="/" >
            <Route index path="Home" element={<Home mauSang={mauSang} danhSachSanPham={danhSachSanPham} />} />
            <Route path="SanPham" element={<SanPham mauSang={mauSang} diaChiServer={diaChiServer} tenThucAn={tenThucAn} 
            danhSachSanPham={danhSachSanPham} themVaoGio={themVaoGio} />} />
            <Route path="GioHang" element={<GioHang danhSachGioHang={danhSachGioHang} TangGiamGio={TangGiamGio} tongGio={tongGio} 
            XoaGioHang={XoaGioHang} tongGiaTien={tongGiaTien} XoaTatCaGioHang={XoaTatCaGioHang} ThanhToan={ThanhToan} />} />
          </Route>
        </Routes>
      </header>
      
    </div>
  );
}
export default App;