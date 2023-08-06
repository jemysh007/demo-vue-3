<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <div ref="table"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator_bootstrap5.min.css"; // Import Tabulator CSS

import store from "../store";

import { API_ROUTES } from "@/services/Routes";
import api from '@/services/Api';

export default {
  name: "dashboard",
  data() {
    return {
      tabulator: null,
      tableData: [],
      loading: true,
    };
  },
  mounted() {
    this.createTabulator();
  },

  methods: {

    deleteRecord(rowData) {
    // Make an API call to delete the record
    // You need to replace this with your actual delete API call
    const stockId = rowData.stock_id; // Assuming stock_id is the unique identifier
    api
      .post(API_ROUTES.DELETE_STOCK, { stock_id: stockId })
      .then((response) => {
        // Assuming the API returns a success status
        if (response.data.success) {
          // Remove the deleted row from the table
          this.createTabulator();

          this.$swal({ text: "Record deleted successfully", icon: "success" });
        } else {
          this.$swal({
            text: "Failed to delete record",
            icon: "error",
          });
        }
      })
      .catch(() => {
        this.$swal({
            text: "Failed to delete record",
            icon: "error",
          });
      });
  },


    createTabulator() {
      this.tabulator = new Tabulator(this.$refs.table, {
        height: "70vh",
        responsiveLayout: true,
        pagination: true,
        paginationMode: "remote",
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 50, 100],
        ajaxURL: API_ROUTES.API_BASE_URL + API_ROUTES.GET_STOCKS,
        type: "POST",

        dataSendParams: {
          page: "page",
        },
        sortMode: "remote", //send sort data to the server instead of processing locally

        dataReceiveParams: {
          last_page: "max_page",
          data: "data",
        },

        ajaxConfig: {
          headers: {
            Authorization: `Bearer ${store.state.token}`,
          },
        },
        paginationTotalRows: "total",

        dataLoaded: (data) => {
          console.log("Data received from server:", data);
        },

        layout: "fitColumns",
        placeholder: "No Records Found",
        columns: [
          { title: "Stock No.", field: "stock_id", sorter: "string" },
          { title: "Item Code", field: "item_code", sorter: "string" },
          { title: "Item Name", field: "item_name", sorter: "string" },
          {
            title: "Quantity",
            field: "quantity",
            sorter: "string",
          },
          {
            title: "Location",
            field: "location",
            sorter: "string",
          },
          {
            title: "Store Name",
            field: "store_name",
            sorter: "string",
          },
          {
            title: "In Stock Date",
            field: "in_stock_date",
            sorter: "string",
          },
          {
            title: "Delete",
            headerSort: false,
            formatter: () => {
              return `<button class="btn btn-danger btn-sm delete-btn">Delete</button>`;
            },
            cellClick: (e, cell) => {
              const rowData = cell.getRow().getData();
              this.deleteRecord(rowData);
            },
          },
        ],
      });
    },
  },
};
</script>
