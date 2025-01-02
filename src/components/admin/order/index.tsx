import { getOrdersAPI } from "@/services/api";
import { dateRangeValidate } from "@/services/helper";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef, useState } from "react";
type TSearch = {
  name: string;
  createdAt: string;
  createdAtRange: string;
  quantity: number;
  phone: number;
  bookName: string;
  address: string;
};
const TableOrder = () => {
  const actionRef = useRef<ActionType>();
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });
  const columns: ProColumns<IOrderTable>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Id",
      dataIndex: "_id",
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return <span>{entity._id}</span>;
      },
    },
    {
      title: "Tên sách",

      dataIndex: "bookName",
      render: (_, record) => {
        return record.detail?.[0].bookName ?? 0;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Sđt",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số lượng",
      sorter: true,
      dataIndex: "quantity",
      render: (_, record) => {
        return record.detail?.[0].quantity ?? 0;
      },
    },
    {
      title: "Giá tiền",
      dataIndex: "totalPrice",
      hideInSearch: true,
      sorter: true,
      // https://stackoverflow.com/questions/37985642/vnd-currency-formatting
      render(dom, entity, index, action, schema) {
        return (
          <>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(entity.totalPrice)}
          </>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
  ];
  return (
    <>
      <ProTable<IOrderTable, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          let query = "";
          if (params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`;

            if (params.name) {
              query += `&name=/${params.name}/i`;
            }
            if (params.address) {
              query += `&address=/${params.address}/i`;
            }

            if (params.phone) {
              query += `&phone=${params.phone}`;
            }

            if (params.bookName) {
              query += `&detail.bookName=/${params.bookName}/i`;
            }
            // Lấy quantity
            if (params.quantity) {
              // tuỳ cách server nhận filter, có thể là &quantity=5
              // hoặc &detail.quantity=5, ... tuỳ API
              query += `&detail.quantity=${params.quantity}`;
            }

            if (sort.quantity) {
              query += `&sort=${
                sort.quantity === "ascend"
                  ? "detail.quantity"
                  : "-detail.quantity"
              }`;
            }
            if (sort.totalPrice) {
              query += `&sort=${
                sort.totalPrice === "ascend" ? "totalPrice" : "-totalPrice"
              }`;
            } else {
              query += `&sort=-createdAt`;
            }

            const createDateRange = dateRangeValidate(params.createdAtRange);
            if (createDateRange) {
              query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
            }
          }
          //default
          if (sort && sort.createdAt) {
            query += `&sort=${
              sort.createdAt === "ascend" ? "createdAt" : "-createdAt"
            }`;
          } else query += `&sort=-createdAt`;
          const res = await getOrdersAPI(query);
          if (res.data) {
            setMeta(res.data.meta);
          }
          return {
            data: res.data?.result,
            page: 1,
            success: true,
            total: res.data?.meta.total,
          };
        }}
        rowKey="_id"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        headerTitle="Table Orders"
      />
    </>
  );
};
export default TableOrder;
