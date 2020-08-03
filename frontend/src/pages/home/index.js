import React,{useEffect, useState} from 'react';
import CategoryCard from '../../components/categoryCard';
import {useHistory} from 'react-router-dom'
import {getCategory,getAllTests,validateToken} from '../../services'
import {useDispatch} from "react-redux";

import {setCategoryId,setCategoryName} from "../../actions";


function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([])
  const [allTests, setAllTests] = useState([])


  useEffect(() => {
    const getList = async () => {
      setCategoryList(await getCategory())
      setAllTests(await getAllTests())
    }
    validateToken(localStorage.getItem('token'));
    getList();
  }, [])

  const goTo = (questions,id,name) => {
    dispatch(setCategoryId(id))
    dispatch(setCategoryName(name))

    if(questions>=10){
      return history.push(`/report/`)
    }
    return history.push(`/trivia/`)
  }
  const cardStatus = (questions) => {
    if(questions>=10){
      return "--complete"
    }
    return ""
  }

  return (
    <>
    <div className="category__container">
     
        <h1 className="category__title">Category</h1> 
      
    </div>
      <div className="category__grid">

        {categoryList?.map(category =>{ 
          const searchTestResponse = allTests.find(test => test.category===String(category.id))
          const numberOfQuestions = searchTestResponse?.questions?.length;

           return <CategoryCard status={() => cardStatus(numberOfQuestions)} key={category.id} onClick={()=>goTo(numberOfQuestions,category.name,category.id)} category={category.name} />
        })}
        
        
      </div>
    </>
  );
}

export default Home;
