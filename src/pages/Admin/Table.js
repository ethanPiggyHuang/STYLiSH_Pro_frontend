import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField, MenuItem, Select, Button } from '@mui/material';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  min-width: 120px;
`;

const StyledButton = styled(Button)`
  padding: 5px 15px;
`;

const OnSale = styled.div`
  padding: 5px 15px;
`;

const DataWrap = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const CancelButton = styled.button`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Table = () => {
  const initialRows = [];
  const [rows, setRows] = useState([...initialRows]);
  const [selectedOptions, setSelectedOptions] = useState(rows.map(() => ''));
  const [campaignTimeOptions, setCampaignTimeOptions] = useState(
    rows.map(() => '')
  );

  const [hotData, setHotData] = useState([]);

  const getHotData = () => {
    fetch('https://side-project2023.online/api/1.0/report/hot/list', {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.data[0].discount);
        setHotData(data);
        console.log(hotData);
      });
  };

  const getRatings = () => {
    fetch('https://side-project2023.online/api/1.0/report/order/getevaluate', {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const tryGet = () => {
    fetch('https://side-project2023.online/api/1.0/report/order/detail', {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log the response data
        const newArr = data.data
          .reduce((acc, cur) => {
            acc = [...acc, cur.order_detail];
            return acc;
          }, [])
          .flat(2);
        console.log(newArr);
        const idQty = newArr.reduce((acc, cur) => {
          const id = cur.id;
          const qty = cur.qty;
          if (!acc[id]) {
            acc[id] = qty;
          } else {
            acc[id] += qty;
          }
          return acc;
        }, {});
        console.log(idQty);
        const rankedItems = newArr.reduce((acc, item) => {
          const index = acc.findIndex((obj) => obj.id === item.id);

          if (index !== -1) {
            acc[index].amount += item.qty;
            acc[index].total += item.qty * acc[index].price;
          } else {
            acc.push({
              id: item.id,
              name: item.name,
              amount: item.qty,
              price: item.price,
              total: item.qty * item.price,
              state: 'up', // example state
            });
          }

          return acc;
        }, []);

        rankedItems.sort((a, b) => b.amount - a.amount);

        rankedItems.forEach((item, index) => {
          item.rank = index + 1;
        });

        console.log(rankedItems);
        getHotData();
        console.log(hotData);
        setRows(rankedItems);
      });
  };

  const tryPost = (body) => {
    fetch('https://side-project2023.online/api/1.0/report/hot/add', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const deleteHot = (id, discount, time) => {
    console.log('hi');
    const body = {
      id: id,
      discount: discount,
      deadline: time,
    };

    fetch('https://side-project2023.online/api/1.0/report/hot/delete', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const handleSelectChange = (rowIndex, e) => {
    const newDiscountOptions = [...selectedOptions];
    newDiscountOptions[rowIndex] = e.target.value;
    setSelectedOptions(newDiscountOptions);
    e.stopPropagation();
  };

  const handleCampaignTime = (rowIndex, e) => {
    const newCampaignTimeOptions = [...campaignTimeOptions];
    newCampaignTimeOptions[rowIndex] = e.target.value;
    setCampaignTimeOptions(newCampaignTimeOptions);
    e.stopPropagation();
    console.log(newCampaignTimeOptions);
  };

  function PromotionButton({
    row,
    selectedOptions,
    campaignTimeOptions,
    tryPost,
  }) {
    const [isClicked, setIsClicked] = useState(false);
    const onClick = (e) => {
      e.stopPropagation();
      const selectedDiscount = selectedOptions[row.id];
      const selectedDate = campaignTimeOptions[row.id];
      const date = new Date();
      if (selectedDate === 'option1') {
        date.setDate(date.getDate() + 1);
      } else if (selectedDate === 'option2') {
        date.setDate(date.getDate() + 3);
      } else if (selectedDate === 'option3') {
        date.setDate(date.getDate() + 7);
      }
      const formattedDate = date
        .toISOString()
        .substring(0, 10)
        .replace('T', ' ');
      setIsClicked(!isClicked);
      const discountPost = {
        id: row.id,
        discount: selectedDiscount,
        deadline: formattedDate,
      };
      tryPost(discountPost);
    };
    const buttonText = isClicked ? '取消促銷' : '促銷';
    return <StyledButton onClick={onClick}>{buttonText}</StyledButton>;
  }

  const columns = [
    { field: 'rank', headerName: 'Rank', width: 70 },
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: '商品名稱', width: 200 },

    {
      field: 'amount',
      headerName: '數量',
      width: 100,
      responsive: true,
    },
    {
      field: 'total',
      headerName: '金額',
      width: 120,
      responsive: true,
    },
    // {
    //   field: 'state',
    //   headerName: '狀態',
    //   width: 90,
    //   renderCell: (params) => {
    //     const { value } = params;
    //     let stateColor = '';

    //     if (value === 'up') {
    //       stateColor = '#5cb85c';
    //     } else if (value === 'down') {
    //       stateColor = '#d9534f';
    //     } else if (value === 'even') {
    //       stateColor = '#f0ad4e';
    //     }

    //     return (
    //       <div
    //         style={{
    //           color: 'white',
    //           backgroundColor: stateColor,
    //           borderRadius: '20px',
    //           padding: '3px 10px',
    //           textAlign: 'center',
    //         }}
    //       >
    //         {value}
    //       </div>
    //     );
    //   },
    // },
    {
      field: 'discount',
      headerName: '選擇折扣',
      sortable: false,
      width: 130,
      responsive: true,
      renderCell: (params) => {
        const rowIndex = params.row.id;

        return (
          <StyledSelect
            value={selectedOptions[rowIndex]}
            onChange={(e) => handleSelectChange(rowIndex, e)}
          >
            <MenuItem value="">選擇折數</MenuItem>
            <MenuItem value="0.9">9折</MenuItem>
            <MenuItem value="0.8">8折</MenuItem>
            <MenuItem value="0.5">打到骨折5折</MenuItem>
          </StyledSelect>
        );
      },
    },

    {
      field: 'campaignTime',
      headerName: 'deadline',
      sortable: false,
      width: 130,
      responsive: true,
      renderCell: (params) => {
        const rowIndex = params.row.id;

        return (
          <StyledSelect
            value={campaignTimeOptions[rowIndex]}
            onChange={(e) => handleCampaignTime(rowIndex, e)}
          >
            <MenuItem value="">選擇天數</MenuItem>
            <MenuItem value="option1">1天</MenuItem>
            <MenuItem value="option2">3天</MenuItem>
            <MenuItem value="option3">7天</MenuItem>
          </StyledSelect>
        );
      },
    },
    {
      field: 'action',
      headerName: '促銷',
      sortable: false,
      width: 70,
      responsive: true,
      renderCell: (params) => {
        <PromotionButton
          row={params.row}
          selectedOptions={selectedOptions}
          campaignTimeOptions={campaignTimeOptions}
          tryPost={tryPost}
        />;
      },
    },
  ];

  useEffect(() => {
    tryGet();
  }, []);

  useEffect(() => {
    getHotData();
  }, []);

  return (
    <div style={{ height: '80%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
      <OnSale>
        <button onClick={getHotData}>Get Hot Data</button>
        {hotData.data &&
          hotData.data.map((item) => (
            <DataWrap key={item.id}>
              <Subtitle>ID: {item.id}</Subtitle>
              <Info>Discount: {item.discount}</Info>
              <Info>Deadline: {item.deadline}</Info>
              <CancelButton
                onClick={() => deleteHot(item.id, item.discount, item.deadline)}
              >
                結束促銷
              </CancelButton>
            </DataWrap>
          ))}
      </OnSale>
    </div>
  );
};

export default Table;
