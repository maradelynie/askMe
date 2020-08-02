import React,{useEffect, useState} from 'react';
import CategoryCard from '../../components/categoryCard';
import {useHistory} from 'react-router-dom'
import {getCategory,getAllTests} from '../../services'


function Home() {
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([])
  const [allTests, setAllTests] = useState([])

  useEffect(() => {
    const getList = async () => {
      setCategoryList(await getCategory())
      setAllTests(await getAllTests())
      
    }
    getList();

    
  }, [])
console.log(allTests)
  return (
    <>
    <div className="category__container">
     
        <h1 className="category__title">Category</h1> 
      
    </div>
      <div className="category__grid">

        {categoryList?.map(category =>{ 
          const searchTestResponse = allTests.find(test => test.category===String(category.id))
          const numberOfQuestions = searchTestResponse?.questions?.length;
           return <CategoryCard questions={numberOfQuestions} key={category.id} onClick={() => history.push(`/trivia/${category.id}/${category.name}`)} category={category.name} />
        })}
        
        
      </div>
    </>
  );
}

export default Home;
