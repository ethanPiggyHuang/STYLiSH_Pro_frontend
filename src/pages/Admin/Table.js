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
  const initialRows = [
    {
      id: 1,
      name: 'Cotton T-Shirt',
      ID: 100001,
      amount: 35,
      total: 2000,
      state: 'up',
    },
    {
      id: 2,
      name: 'Denim Jacket',
      ID: 100002,
      amount: 42,
      total: 2000,
      state: 'up',
    },
    {
      id: 3,
      name: 'Leather Boots',
      ID: 100003,
      amount: 45,
      total: 3000,
      state: 'down',
    },
    {
      id: 4,
      name: 'Suede Skirt',
      ID: 100004,
      amount: 20,
      total: 1500,
      state: 'down',
    },
    {
      id: 5,
      name: 'Silk Scarf',
      ID: 100005,
      amount: 10,
      total: 800,
      state: 'down',
    },
    {
      id: 6,
      name: 'Wool Sweater',
      ID: 100006,
      amount: 25,
      total: 1800,
      state: 'down',
    },
    {
      id: 7,
      name: 'Canvas Sneakers',
      ID: 100007,
      amount: 30,
      total: 2500,
      state: 'even',
    },
    {
      id: 8,
      name: 'Cashmere Cardigan',
      ID: 100008,
      amount: 15,
      total: 3000,
      state: 'even',
    },
    {
      id: 9,
      name: 'Linen Blouse',
      ID: 100009,
      amount: 18,
      total: 1200,
      state: 'even',
    },
    {
      id: 10,
      name: 'Velvet Dress',
      ID: 100010,
      amount: 5,
      total: 400,
      state: 'even',
    },
    {
      id: 11,
      name: 'Nylon Windbreaker',
      ID: 100011,
      amount: 12,
      total: 900,
      state: 'even',
    },
    {
      id: 12,
      name: 'Polyester Pants',
      ID: 100012,
      amount: 22,
      total: 2000,
      state: 'even',
    },
    {
      id: 13,
      name: 'Rayon Shirt',
      ID: 100013,
      amount: 8,
      total: 500,
      state: 'even',
    },
    {
      id: 14,
      name: 'Satin Blouse',
      ID: 100014,
      amount: 16,
      total: 1200,
      state: 'even',
    },
    {
      id: 15,
      name: 'Tweed Jacket',
      ID: 100015,
      amount: 7,
      total: 600,
      state: 'even',
    },
  ];
  const [rows, setRows] = useState([...initialRows]);
  const [selectedOptions, setSelectedOptions] = useState(rows.map(() => ''));
  const [campaignTimeOptions, setCampaignTimeOptions] = useState({});
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
  };

  const columns = [
    { field: 'id', headerName: '排名', width: 100 },
    { field: 'name', headerName: '商品名稱', width: 130 },
    { field: 'ID', headerName: 'ID', width: 130 },
    {
      field: 'amount',
      headerName: '數量',
      width: 120,
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
            <MenuItem value="option1">9折</MenuItem>
            <MenuItem value="option2">8折</MenuItem>
            <MenuItem value="option3">打到骨折5折</MenuItem>
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

          return alert(JSON.stringify(thisRow, null, 4));
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
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default Table;
