import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../Card";
import Title from "../Title";
import InputContainer from "../InputContainer";
import "./style.scss";

const List = ({ list, index }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="list-cards" {...provided.dragHandleProps}>
            <div className="title-list">
              <Title title={list.title} listId={list.id} />
            </div>
            <div className="container-cards">
              <Droppable droppableId={list.id} type="task">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="card-container"
                  >
                    {list.cards.map((card, index) => (
                      <Card
                        key={card.id}
                        card={card}
                        listId={list.id}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <InputContainer listId={list.id} type="card" />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
