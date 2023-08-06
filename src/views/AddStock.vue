<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg--12 col-md-12 col-12">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add New Record
            </button>
            <ag-grid-vue
              style="width: 100%; height: 350px"
              class="ag-theme-alpine"
              :gridOptions="gridOptions"
              :rowData="rowData"
            ></ag-grid-vue>
          </div>

          <div class="row">
            <div class="col-md-12 mt-2 float-right">
              <button
                type="button"
                class="btn btn-primary ml-auto"
                @click="submitAll()"
              >
                Submit All
              </button>
            </div>
          </div>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            @show="clearForm"

          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add New Stock
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="item_code" class="form-label">Item Code</label>
                      <input
                        type="text"
                        class="form-control"
                        id="item_code"
                        v-model="newRecord.item_code"
                        placeholder="Enter item code"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="item_name" class="form-label">Item Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="item_name"
                        v-model="newRecord.item_name"
                        placeholder="Enter item name"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="quantity" class="form-label">Quantity</label>
                      <input
                        type="number"
                        class="form-control"
                        id="quantity"
                        v-model="newRecord.quantity"
                        placeholder="Enter quantity"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="location" class="form-label">Location</label>
                      <input
                        type="text"
                        class="form-control"
                        id="location"
                        v-model="newRecord.location"
                        placeholder="Enter location"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="store_name" class="form-label"
                        >Store Name</label
                      >
                      <select
                        class="form-select"
                        v-model="newRecord.store_name"
                        id="store_name"
                        required
                      >
                        <option selected>Select Store Name</option>
                        <option>Store 1</option>
                        <option>Store 2</option>
                        <option>Store 3</option>
                        <option>Store 4</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="in_stock_date" class="form-label"
                        >In-Stock Date</label
                      >
                      <input
                        type="date"
                        class="form-control"
                        id="in_stock_date"
                        v-model="newRecord.in_stock_date"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    @click="addRecord()"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { API_ROUTES } from "@/services/Routes";
import api from '@/services/Api';

export default {
  name: "addstock",
  components: { AgGridVue },
  data() {
    return {
      newRecord: {
        item_code: "",
        item_name: "",
        quantity: 0,
        location: "",
        store_name: "Store 1",
        in_stock_date: "",
      },
      gridOptions: {
        columnDefs: [
          { headerName: "Item Code", field: "item_code" },
          { headerName: "Item Name", field: "item_name" },
          { headerName: "Quantity", field: "quantity" },
          { headerName: "Location", field: "location" },
          { headerName: "Store Name", field: "store_name" },
          { headerName: "In-Stock Date", field: "in_stock_date" },
          
        ],
        defaultColDef: {
          flex: 1,
          minWidth: 100,
          sortable: true,
          resizable: true,
        },

      },
      rowData: [],
    };
  },

  methods: {
    addRecord() 
    {
      if (this.validateRecord()) {
        // Push the new record to rowData if it's valid
        console.log("fghj", this.newRecord);
        this.rowData.push({ ...this.newRecord });

        // Clear the form after adding the record

        this.rowData = [...this.rowData];

        this.clearForm();
      }
    },

    validateRecord() {
      if (
        this.newRecord.item_code.trim() === "" ||
        this.newRecord.item_name.trim() === "" ||
        this.newRecord.quantity <= 0 ||
        this.newRecord.location.trim() === "" ||
        this.newRecord.store_name === "Select Store Name" ||
        this.newRecord.in_stock_date === ""
      ) {
        this.$swal({
          text: "Please fill in all the required fields",
          icon: "error",
        });
        return false;
      }

      return true;
    },
    clearForm() {
      this.newRecord = {
        item_name: "",
        quantity: 0,
        location: "",
        store_name: "Store 1",
        in_stock_date: "",
      };
    },
    submitAll() {
      if (this.rowData.length > 0) {
        const postData = this.rowData;

        api
        .post(API_ROUTES.SAVE_STOCKS, postData)
        .then(response => {
          if(response.data.success){
            this.$swal({ text: response.data.message, icon: "success" });
            this.rowData = [];
          }else{
            this.$swal({ text: response.data.message, icon: "error" });
          }
        })
        .catch(response => {
          this.$swal({ text: response.data.message, icon: "error" });

        });
      } else {
        this.$swal({ text: "Please add at least one record", icon: "error" });
      }
    },
  },
};
</script>
