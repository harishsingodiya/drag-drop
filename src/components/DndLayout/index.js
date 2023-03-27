import React from "react";
import { Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DndLayout = ({handleShowImage, items, onDragEnd}) => {

  return (
    <div className="px-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="row"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <div key={item.position} className="col-sm-4 my-2">
                  <Draggable
                    key={item.position}
                    draggableId={item.position}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          height: "23rem",
                        }}
                      >
                        <Card.Header>{item.title}</Card.Header>
                        <Card.Img
                          variant="top"
                          className="thumbnail img-card p-1"
                          src={item.image}
                          onClick={() => handleShowImage(item)}
                        />
                      </Card>
                    )}
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
    </div>
  );
};

export default DndLayout;
