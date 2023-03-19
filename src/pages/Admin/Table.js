import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField, MenuItem, Select, Button } from '@mui/material';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  min-width: 120px;
`;

const StyledButton = styled(Button)`
  padding: 5px 15px;
`;

const Table = () => {
  const initialRows = [];
  const [rows, setRows] = useState([...initialRows]);
  const [selectedOptions, setSelectedOptions] = useState(rows.map(() => ''));
  const [campaignTimeOptions, setCampaignTimeOptions] = useState(
    rows.map(() => '')
  );

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
        // Save the response data to a variable for later use

        console.log(data);
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

  const columns = [
    { field: 'rank', headerName: 'Rank', width: 70 },
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: '商品名稱', width: 150 },

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
    {
      field: 'state',
      headerName: '狀態',
      width: 90,
      renderCell: (params) => {
        const { value } = params;
        let stateColor = '';

        if (value === 'up') {
          stateColor = '#5cb85c';
        } else if (value === 'down') {
          stateColor = '#d9534f';
        } else if (value === 'even') {
          stateColor = '#f0ad4e';
        }

        return (
          <div
            style={{
              color: 'white',
              backgroundColor: stateColor,
              borderRadius: '20px',
              padding: '3px 10px',
              textAlign: 'center',
            }}
          >
            {value}
          </div>
        );
      },
    },
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
      field: 'action',
      headerName: '促銷',
      sortable: false,
      width: 70,
      responsive: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const thisRow = params.row;
          console.log(thisRow);
          const selectedDiscount = selectedOptions[thisRow.id];
          const selectedDate = campaignTimeOptions[thisRow.id];

          console.log('Selected discount:', selectedDiscount);
          console.log('Selected date:', selectedDate);
          const date = new Date();
          if (selectedDate === 'option1') {
            date.setDate(date.getDate() + 1);
          } else if (selectedDate === 'option2') {
            date.setDate(date.getDate() + 3);
          } else if (selectedDate === 'option3') {
            date.setDate(date.getDate() + 7);
          }
          console.log(date);
          const formattedDate = date
            .toISOString()
            .substring(0, 10)
            .replace('T', ' ');
          console.log(formattedDate); // outputs "2023-03-22"
          const discountPost = {
            id: thisRow.id,
            discount: selectedDiscount,
            deadline: formattedDate,
          };
          console.log(formattedDate);
          tryPost(discountPost);
          return console.log(discountPost);
        };

        return <StyledButton onClick={onClick}>促銷</StyledButton>;
      },
    },
    {
      field: 'campaignTime',
      headerName: 'deadline',
      sortable: false,
      width: 200,
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
  ];

  return (
    <div style={{ height: '80%', width: '100%' }}>
      <button onClick={() => tryGet()}>開始排名</button>
      <button onClick={() => getHotData()}>get hot data</button>
      <button onClick={() => getRatings()}>get rating</button>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default Table;
