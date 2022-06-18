import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import StoreApi from "../../utils/storeApi";
import { db, timestamp } from "../../firebase";
import List from "../List";
import sample from "../../utils/sample";
import InputContainer from "../InputContainer";
import "./style.scss";

const Home = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "lists"), orderBy("timestamp", "asc"));
    onSnapshot(q, (snapShot) => {
      setLists(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const addMoreCard = async (title, listId) => {
    if (!title) {
      return;
    }

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const listRef = doc(db, "lists", listId);

    await updateDoc(listRef, {
      cards: arrayUnion(newCard),
    });
  };

  const removeCard = (index, listId, cardId) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards.splice(index, 1);
        await updateDoc(listRef, {
          cards: list.cards.filter((card) => card.id !== cardId),
        });
      }
      return list;
    });
  };

  const updateCardTitle = (title, index, listId, cardId) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards[index].title = title;
        await updateDoc(listRef, {
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
              card.title = title;
              return card;
            }
            return card;
          }),
        });
      }
      return list;
    });
  };

  const addMoreList = async (title) => {
    if (!title) {
      return;
    }

    await addDoc(collection(db, "lists"), {
      title,
      cards: [],
      timestamp,
    });
  };

  const updateListTitle = (title, listId) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.title = title;
        await updateDoc(listRef, {
          title,
        });
      }
      return list;
    });
  };

  const deleteList = async (listId) => {
    await deleteDoc(doc(db, "lists", listId));
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      const destinationRef = doc(db, "lists", lists[destination.index].id);
      const sourceRef = doc(db, "lists", lists[source.index].id);

      await updateDoc(destinationRef, {
        timestamp: lists[source.index].timestamp,
      });

      await updateDoc(sourceRef, {
        timestamp: lists[destination.index].timestamp,
      });
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list = list.find((list) => list.id === source.droppableId);

      const updateCards = list.cards.map((card, index) => {
        if (index === source.index) {
          return list.cards[destination.index];
        }
        if (index === destination.index) {
          return list.cards[source.index];
        }
        return card;
      });
      const listRef = doc(db, "lists", destination.droppableId);
      await updateDoc(listRef, {
        cards: updateCards,
      });
    } else {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find(
        (list) => list.id === destination.droppableId
      );
      const draggingCard = sourceList.cards.filter(
        (card) => card.id === draggableId
      )[0];

      const sourceListRef = doc(db, "lists", source.droppableId);

      sourceList.cards.splice(source.index, 1);

      await updateDoc(sourceListRef, {
        cards: sourceList.cards,
      });

      const destinationListRef = doc(db, "lists", destination.droppableId);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      await updateDoc(destinationListRef, {
        cards: destinationList.cards,
      });
    }
  };

  return (
    <StoreApi.Provider
      value={{
        addMoreCard,
        addMoreList,
        updateListTitle,
        removeCard,
        deleteList,
        updateCardTitle,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) => (
            <div className="wrapper" ref={provided.innerRef}>
              {lists.map((list, index) => {
                return <List list={list} index={index} key={list.id} />;
              })}
              <div>
                <InputContainer type="list" />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StoreApi.Provider>
  );
};

export default Home;
