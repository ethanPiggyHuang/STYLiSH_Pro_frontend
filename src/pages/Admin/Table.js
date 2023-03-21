import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField, MenuItem, Select, Button } from '@mui/material';
import styled from 'styled-components/macro';

const StyledSelect = styled(Select)`
  min-width: 120px;
`;

const StyledButton = styled(Button)`
  padding: 5px 15px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const OnSale = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const DataWrap = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
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
  padding: 8px 12px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #c82333;
  }
`;

const SaleTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Table = () => {
  const initialRows = [];
  const [rows, setRows] = useState([...initialRows]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(rows.map(() => ''));
  const [campaignTimeOptions, setCampaignTimeOptions] = useState(
    rows.map(() => '')
  );
  const [promotionClicked, setPromotionClicked] = useState(
    rows.map(() => false)
  );

  const [hotData, setHotData] = useState([]);
  const isPromoting = (id) => {
    return hotData.data.some((item) => item.id === id);
  };
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
        //console.log(data.data[0].discount);
        setHotData(data);
        console.log(hotData);
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
        console.log(hotData);
        const rankedItemsWithPromotion = rankedItems.map((item) => {
          console.log('item.id', item.id);
          console.log('hotData', hotData.data);
          const isPromoting = hotData.data.some(
            (hotItem) => hotItem.id === item.id
          );
          console.log(isPromoting);
          return {
            ...item,
            isPromoting,
          };
        });
        console.log(rankedItemsWithPromotion);
        setRows(rankedItemsWithPromotion);
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

  const deleteHot = (id, discount, deadline) => {
    console.log('hi');
    const body = {
      id: id,
      discount: discount,
      deadline: deadline,
    };
    fetch('https://side-project2023.online/api/1.0/report/hot/delete', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setDeleteSuccess(true);
      });
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
    deleteHot,
    promotionClicked,
    setPromotionClicked,
  }) {
    const isClicked = promotionClicked[row.id];

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

      setPromotionClicked((prevState) => ({
        ...prevState,
        [row.id]: !prevState[row.id],
      }));
      const discountPost = {
        id: row.id,
        discount: selectedDiscount,
        deadline: formattedDate,
      };

      if (row.isPromoting) {
        deleteHot(row.id, row.discount, row.deadline);
      } else {
        tryPost(discountPost);
      }
    };
    console.log(row.id, row.isPromoting);

    return (
      <Button
        variant="contained"
        color={row.isPromoting ? 'secondary' : 'primary'}
        disabled={row.isPromoting}
        onClick={onClick}
      >
        {row.isPromoting ? '促銷中' : '設為促銷'}
      </Button>
    );
  }

  const columns = [
    { field: 'rank', headerName: 'Rank', width: 70, resizable: true },
    { field: 'id', headerName: 'ID', width: 150, resizable: true },
    { field: 'name', headerName: '商品名稱', width: 250, resizable: true },
    { field: 'amount', headerName: '數量', width: 100, resizable: true },
    { field: 'total', headerName: '金額', width: 120, resizable: true },
    {
      field: 'discount',
      headerName: '折扣',
      width: 150,
      resizable: true,
      renderCell: (params) => {
        const rowIndex = params.row.id;
        return (
          <StyledSelect
            value={selectedOptions[rowIndex]}
            onChange={(e) => handleSelectChange(rowIndex, e)}
            disabled={promotionClicked[rowIndex]} // pass disabled prop based on the isClicked state
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
      headerName: '期限',
      width: 150,
      resizable: true,
      renderCell: (params) => {
        const rowIndex = params.row.id;

        return (
          <StyledSelect
            value={campaignTimeOptions[rowIndex]}
            onChange={(e) => handleCampaignTime(rowIndex, e)}
            disabled={promotionClicked[rowIndex]} // pass disabled prop based on the isClicked state
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
      width: 100,
      resizable: true,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <PromotionButton
          row={params.row}
          selectedOptions={selectedOptions}
          campaignTimeOptions={campaignTimeOptions}
          promotionClicked={promotionClicked} // pass promotionClicked state to the PromotionButton component
          setPromotionClicked={setPromotionClicked}
          tryPost={tryPost}
        />
      ),
    },
  ];

  // remove hotData from dependency array
  useEffect(() => {
    tryGet();
  }, [hotData, deleteSuccess]);

  // add hotData to dependency array
  useEffect(() => {
    getHotData();
  }, [hotData]);
  //TODO

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
      <SaleTitle>促銷中的商品</SaleTitle>
      <OnSale>
        {hotData.data &&
          hotData.data.map((item) => (
            <Wrap>
              <DataWrap key={item.id}>
                <Subtitle>ID: {item.id}</Subtitle>
                <Info>Discount: {item.discount}</Info>
                <Info>Deadline: {item.deadline}</Info>
                <CancelButton
                  onClick={() =>
                    deleteHot(item.id, item.discount, item.deadline)
                    
                  }
                >
                  結束促銷
                </CancelButton>
              </DataWrap>
            </Wrap>
          ))}
      </OnSale>
    </div>
  );
};

export default Table;
