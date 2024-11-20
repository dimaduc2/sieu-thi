import React, { useEffect, useState } from 'react';
import { Table, Card, Row, Col, Button, Image, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BiCartAdd } from "react-icons/bi";

function SanPham({mauSang, diaChiServer, tenThucAn, danhSachSanPham, themVaoGio}) {
  useEffect(() => {
    axios.get('http://'+diaChiServer+'/SanPhamVidu?tenThucAn='+tenThucAn)
    // axios.post('http://'+diaChiServer+'/chaoHoi?guiChaoHoi=123456')
    .then(res => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },[tenThucAn])


  const [show, setShow] = useState(false);
  const [sanPhamDangChon, setSanPhamDangChon] = useState('');

  const [soLuong, setSoLuong] = useState(1);
  
  const handleClose = () => setShow(false);
  const handleShow = (sanPham) => {
    setSanPhamDangChon(sanPham)
    setShow(true);
    setSoLuong(1)
  }

  const giamSoLuong = () => {
    if(1<soLuong){
      setSoLuong(soLuong-1)
    }
  }
  const tangSoLuong = (soLuongHetHan) => {
    if(soLuong<soLuongHetHan){
      setSoLuong(soLuong+1)
    }
  }

  return (
    <div>
      {tenThucAn}
      {/* {danhSachSanPham.length===0
        ?null
        :
        <Table style={{color: mauSang ?'white' :'black'}} striped={mauSang ?false :true}>
          <thead>
            <tr>
              <th>Loại</th>
              <th>Tên</th>
              <th>Giá tiền</th>
              <th>Số lượng trong kho</th>
            </tr>
          </thead>
          <tbody>
            {danhSachSanPham.map((moiSanPham, index)=>
              <tr>
                <td>{moiSanPham.Loai}</td>
                <td>{moiSanPham.Ten}</td>
                <td>{moiSanPham.GiaTien}</td>
                <td>{moiSanPham.SoLuongTrongKho}</td>
              </tr>
            )}
          </tbody>
        </Table>
      } */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Image src={sanPhamDangChon.DiaChiAnh} style={{width: '300px'}}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>      
          {/* {danhSachSanPham[0]} */}
          {sanPhamDangChon.Ten}
          <br/>
          Giá tiền {sanPhamDangChon.GiaTien} đồng
          <br/>
          Số lượng <Button variant="" onClick={() => giamSoLuong()}>-</Button > [ {soLuong} ] 
          <Button variant="" onClick={() => tangSoLuong(sanPhamDangChon.SoLuongTrongKho)}>+</Button>
          <br/>
          {sanPhamDangChon.SoLuongTrongKho > 0
            ?<Button variant="danger" onClick={() => themVaoGio(soLuong, sanPhamDangChon.id)}><BiCartAdd/> Thêm Vào Giỏ Hàng</Button>
            :<Button variant="secondary">Hết Hàng</Button>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {danhSachSanPham.length===0
        ?null
        :
        <Row style={{color: mauSang ?'white' :'black'}} striped={mauSang ?false :true}>
          {danhSachSanPham.map((moiSanPham, index)=>
            <Col>
              <Card>
                <Card.Header>
                  <Image src={moiSanPham.DiaChiAnh} style={{width: '50px'}} onClick={()=>handleShow(moiSanPham)} />
                </Card.Header>
                <Card.Body>
                  <Card.Title>{moiSanPham.Ten}</Card.Title>
                  <Card.Text>
                    Giá tiền: {moiSanPham.GiaTien} đ
                    <br/>
                    {moiSanPham.SoLuongTrongKho > 0
                      ?<Button variant="danger" onClick={() => themVaoGio(1, moiSanPham.id)}><BiCartAdd/> Thêm Vào Giỏ Hàng</Button>
                      :<Button variant="secondary">Hết Hàng</Button>
                    }
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      }
    </div>
  );
}
export default SanPham;