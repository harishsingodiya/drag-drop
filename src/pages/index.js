import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { DndLayout, ImageOverlay, OverlaySpinner } from "./componentTree";
import { initialDataLoad, reorder, checkForDataChanged } from "../helper";
import defaultData from "../server/defaultData.json";

const baseURL = process.env.REACT_APP_BASE_URL;

const DndLayoutContainer = () => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});


   /***
   * Updating data into database
   */
  const handleUpdateData = useCallback(async () => {
    if (isDataChanged) {
      setLoading(true);
      axios
        .put(`${baseURL}/data`, { data: items })
        .then((response) => {
          const result = response.data;
          setLoading(false);
          setOriginalData([...result]);
          setItems([...result]);
          setIsDataChanged(false);
        })
        .catch(() => {
          setLoading(true);
        });
    }
  }, [isDataChanged, items]);

  /***
   * Fetching data from database
   */

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`${baseURL}/data`)
      .then((response) => {
        const result = response.data;
        setLoading(false);
        setOriginalData([...result]);
        setItems([...result]);
      })
      .catch((err) => {
        setLoading(true);
      });
  };

  const onDragEnd = (result) => {
    //dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemsList = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setIsDataChanged(checkForDataChanged(originalData, itemsList));
    setItems([...itemsList]);
  };

  const handleShowImage = (item) => {
    setSelectedItem(item);
    setShowImage(true);
  };

  /***
   * updating data in every 5 seconds
   */
  useEffect(() => {
    let interval = setInterval(() => {
      handleUpdateData();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [handleUpdateData]);

  /**
   * store data into database initially and fetching data
   */
  useEffect(() => {
    initialDataLoad(defaultData);
    fetchData();
  }, []);

  return (
    <div className="px-4">
      <DndLayout
        handleShowImage={handleShowImage}
        items={items}
        setItems={setItems}
        onDragEnd={onDragEnd}
      />
      <OverlaySpinner loading={loading} />
      <ImageOverlay
        show={showImage}
        data={selectedItem}
        setShow={setShowImage}
      />
    </div>
  );
};

export default DndLayoutContainer;
