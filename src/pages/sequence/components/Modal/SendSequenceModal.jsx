import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { axiosInstance } from "../../../../utils/axios-instance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SendSequenceModal = () => {
  const [phone, setPhone] = useState("");
  const [seqName, setSeqName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //! handling send sequence
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = `${dateValue.getFullYear()}-${dateValue.getMonth()}-${dateValue.getDate()}`;
    let hours = timeValue.getHours();
    let mins = timeValue.getMinutes();
    hours = hours / 10 < 1 ? "0" + hours : hours;
    mins = mins / 10 < 1 ? "0" + mins : mins;
    console.log("mins::", mins, "hours::", hours);
    const time = `${hours}:${mins}:00`;
   
    const data = {
      phone: `91${phone}` ,
      start_datetime: date + " " + time,
      sequence_name: seqName,
    };

    try {
      await axiosInstance.post("send_sequence", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="p-2  ring-1 ring-white ring-opacity-70 text-opacity-70 rounded-md text-white px-5 font-bold shadow"
      >
        Send Sequence
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            className="rounded-lg outline-none border-none shadow-md w-[600px]"
          >
            <h1 className="text-2xl text-gray-800 font-bold">Send Sequence</h1>
            <hr className="mb-2" />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col pt-5 pr-2 w-full gap-4 overflow-y-auto h-[80vh]"
            >
              <TextField
                id="outlined-basic"
                label="Phone Number"
                constiant="outlined"
                name="phoneNumber"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Sequence Name"
                constiant="outlined"
                name="sequenceName"
                value={seqName}
                required
                onChange={(e) => setSeqName(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={dateValue}
                  inputFormat="yyyy-MM-dd"
                  mask="____-__-__"
                  onChange={(newValue) => setDateValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />

                <TimePicker
                  label="Select Time"
                  value={timeValue}
                  ampm={false}
                  onChange={(newValue) => setTimeValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                {/* <TimePicker
                  value={timeValue}
                  format="hh:mm:ss"
                  onChange={(newValue) => {
                    setTimeValue(newValue);
                  }}
                /> */}
              </LocalizationProvider>

              <Button
                constiant="contained"
                type="submit"
                endIcon={<SendIcon />}
                className="bg-gray-800 text-white sticky bottom-0 ml-3"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SendSequenceModal;
