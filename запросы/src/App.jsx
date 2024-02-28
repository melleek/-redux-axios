import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addData, completedData, deleteData, editData, getData } from './api/api'
import { Button, Dialog, TextField } from '@mui/material'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Close, Delete, Edit } from '@mui/icons-material';

function App() {

  const dispatch = useDispatch()

  const todo = useSelector((store) => store.reducer.todo)
  console.log(todo);

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])


  //add
  const [textAdd, setTextAdd] = useState('')
  const [addModal, setAddModal] = useState(false)

  const open = () => {
    setAddModal(true)
  }

  const close = () => {
    setAddModal(false)
  }


  //edit
  const [edit, setEdit] = useState(false)
  const [idx, setIdx] = useState(null)
  const [editText, setEditText] = useState('')

  const editOpen = (e) => {
    setEdit(true)
    setIdx(e.id)
    setEditText(e.title)
  }

  const closeEdit = () => {
    setEdit(false)
  }

  const [sortId, setSortId] = useState(null);

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy === 'id') {
      const sortedById = [...todo].sort((a, b) => a.id - b.id);
      setSortId(sortedById);
    } else if (sortBy === 'date') {
      const dateSort = [...todo].sort((a, b) => new Date(a.date) - new Date(b.date));
      setSortId(dateSort);
    } else {
      setSortId(null)
    }
  }



  return (
    <>
      <main className='w-[1500px] m-[auto]'>
        <section className='p-[80px]'>
          <div className='flex justify-between items-center gap-[770px]'>
            <div className='flex items-center gap-[20px]'>
              <select onChange={handleSortChange} className='w-[300px] border-[1px] border-[gray] py-[15px] rounded-[5px] px-[10px]'>
                <option>All</option>
                <option value="date">Sort by date</option>
                <option value="id">Sort By id</option>
              </select>
            </div>
            <Button sx={{
              background: 'black', marginRight: '40px', color: 'white', ':hover': {
                backgroundColor: 'black'
              }
            }} onClick={open}>Add +</Button>
          </div>
          <aside className='flex flex-wrap items-start gap-[50px] py-[40px]'>
            {sortId ? (
              sortId.map((e) => {
                return (
                  <div key={e.id} className='w-[400px] py-[20px] shadow-md p-[15px] rounded-[8px]'>
                    <div className='h-[80px] flex items-start gap-[10px]'>
                      <TaskAltOutlinedIcon
                        className='cursor-pointer'
                        onClick={() => dispatch(completedData(e))}
                        color={e.completed ? "success" : "inherit"}
                      >
                        {e.completed ? "true" : "false"}
                      </TaskAltOutlinedIcon>
                      <p className='flex items-start gap-[10px]'>{e.title}</p>
                    </div>
                    <div className='flex items-center gap-[10px] py-[20px]'>
                      <Button sx={{
                        display: 'flex', gap: '5px', fontSize: '13px', background: 'red', color: 'white', ':hover': {
                          backgroundColor: '#ff000077'
                        }
                      }} onClick={() => dispatch(deleteData(e.id))}><Delete />delete</Button>
                      <Button sx={{
                        display: 'flex', gap: '5px', fontSize: '13px', background: '#107e9e', color: 'white', ':hover': {
                          backgroundColor: '#107d9e77'
                        }
                      }} onClick={() => editOpen(e)}><Edit /> edit</Button>
                    </div>
                  </div>
                )
              })
            ) : (
              todo.map((e) => {
                return (
                  <div key={e.id} className='w-[400px] py-[20px] shadow-md p-[15px] rounded-[8px]'>
                    <div className='h-[80px] flex items-start gap-[10px]'>
                      <TaskAltOutlinedIcon
                        className='cursor-pointer'
                        onClick={() => dispatch(completedData(e))}
                        color={e.completed ? "success" : "inherit"}
                      >
                        {e.completed ? "true" : "false"}
                      </TaskAltOutlinedIcon>
                      <p className='flex items-start gap-[10px]'>{e.title}</p>
                    </div>
                    <div className='flex items-center gap-[10px] py-[20px]'>
                      <Button sx={{
                        display: 'flex', gap: '5px', fontSize: '13px', background: 'red', color: 'white', ':hover': {
                          backgroundColor: '#ff000077'
                        }
                      }} onClick={() => dispatch(deleteData(e.id))}><Delete />delete</Button>
                      <Button sx={{
                        display: 'flex', gap: '5px', fontSize: '13px', background: '#107e9e', color: 'white', ':hover': {
                          backgroundColor: '#107d9e77'
                        }
                      }} onClick={() => editOpen(e)}><Edit /> edit</Button>
                    </div>
                  </div>
                )
              })
            )}
          </aside>
        </section>
      </main>


      {/* modal */}
      {/* addModal */}
      <Dialog
        open={addModal}
        onClose={close}
      >
        <div className='p-[20px] flex flex-col gap-[20px] w-[300px]'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[22px] font-[600]'>Add New Task</h1>
            <Close className='cursor-pointer' onClick={close} />
          </div>
          <div className='flex flex-col  gap-[20px]'>
            <TextField value={textAdd} label='Task' onChange={(e) => setTextAdd(e.target.value)} />
            <Button sx={{
              display: 'flex', gap: '5px', fontSize: '13px', background: '#4ecbf1', color: 'white', ':hover': {
                backgroundColor: '#4ecbf1a3'
              }
            }} onClick={() => {
              close()
              let user = {
                id: Date.now(),
                completed: false,
                title: textAdd,
                date: new Date()
              };
              setTextAdd('')
              dispatch(addData(user))
            }}>Save</Button>
          </div>
        </div>
      </Dialog >

      {/* edit */}
      <Dialog
        open={edit}
        onClose={closeEdit}
      >
        <div className='p-[20px] flex flex-col gap-[20px] w-[300px]'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[22px] font-[600]'>Edit Task</h1>
            <Close className='cursor-pointer' onClick={closeEdit} />
          </div>
          <div className='flex flex-col  gap-[20px]'>
            <TextField value={editText} onChange={(e) => setEditText(e.target.value)} />
            <Button sx={{
              display: 'flex', gap: '5px', fontSize: '13px', background: '#4ecbf1', color: 'white', ':hover': {
                backgroundColor: '#4ecbf1a3'
              }
            }} onClick={() => {
              closeEdit()
              dispatch(editData({ id: idx, user: { title: editText, completed: false, date: new Date() } }))
            }}>Save</Button>
          </div>
        </div>
      </Dialog >
    </>
  )
}

export default App  