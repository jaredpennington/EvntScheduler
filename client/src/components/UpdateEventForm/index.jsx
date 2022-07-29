import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { UPDATE_EVENT } from "../../utils/mutations";
import { QUERY_ME, QUERY_EVENT } from "../../utils/queries";
import pushDateWindows from "../../utils/dateConversion";

const UpdateEventForm = () => {
  let event_id = useParams().id;
  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: event_id },
  });

  const [formState, setFormState] = useState({
    eventName: () => {
      if (!loading) return data.event.event_name;
    },
    dateWindows: "",
    additionalInfo: () => {
      if (!loading) return data.event.additional_info;
    },
  });
  const [dateInput, setDateInput] = useState([]);

  const addInput = () => {
    setDateInput((d) => {
      return [
        ...d,
        {
          type: "date",
          value: "",
        },
        {
          type: "date",
          value: "",
        },
      ];
    });
  };

  const removeInput = (event) => {
    let index = Number(event.target.id.charAt(1)); // 02 -> 2
    let arr = dateInput.filter((d, i) => i !== index && i !== index + 1);
    setDateInput(arr);
  };

  const handleDateChange = (event) => {
    event.preventDefault();

    const index = event.target.id;
    setDateInput((d) => {
      const newArr = d.slice();
      newArr[index].value = event.target.value;

      return newArr;
    });
  };

  const [updateEvent, { error }] = useMutation(UPDATE_EVENT, {
    update(cache, { data: { updateEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });

        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, events: [...me.events, updateEvent] } },
        });
      } catch (e) {
        console.warn("First folder insertion by user!");
      }
      if (error) throw error;
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let dateWindows = pushDateWindows(dateInput); // [[start, end],[start, end],...]
    try {
      await updateEvent({
        variables: { ...formState, id: event_id, dateWindows: dateWindows },
      });

      window.location.href = `/`;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let inputArr = [];
    let index = 0;
    if (!loading) {
      data.event.date_windows.map((date) => {
        for (let i = 0; i < date.length; i++) {
          inputArr.push({
            type: "date",
            value: date[i],
            id: index,
          });
          index++;
        }
      });
    }
    setDateInput(inputArr);
  }, [loading]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="my-auto">
            <div className="uk-card uk-card-body card-centering">
              <form
                className="form-centering form-input-margin"
                onChange={handleChange}
                onSubmit={handleFormSubmit}
              >
                <input
                  className="form-input-margin"
                  name="eventName"
                  type="text"
                  id="eventName"
                  defaultValue={data.event.event_name}
                />
                <button
                  className="form-input-margin button-border"
                  type="button"
                  onClick={addInput}
                >
                  Add Date Range
                </button>
                {dateInput.map((input, index) => (
                  <span key={index}>
                    {index % 2 === 0 && index !== 0 && (
                      <div className="go-to-the-center">
                        <button
                          className="form-input-margin button-border "
                          type="button"
                          onClick={removeInput}
                          id={`0${index}`}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    <div>
                      {index % 2 === 0 ? (
                        <span>From: </span>
                      ) : (
                        <span> To: </span>
                      )}
                      <input
                        className="form-input-margin"
                        onChange={handleDateChange}
                        defaultValue={input.value}
                        id={index}
                        type={input.type}
                      />
                    </div>
                  </span>
                ))}
                <textarea
                  className="from-input-margin"
                  defaultValue={data.event.additional_info}
                  name="additionalInfo"
                  id="additionalInfo"
                  rows="2"
                  cols="22"
                ></textarea>
                <button
                  className="form-input-margin button-border"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateEventForm;
