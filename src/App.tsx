
import './App.css'
import { GraphControls } from './components/GraphControls'
import {  Breadcrumb,
          BreadcrumbList,
          BreadcrumbItem,
          BreadcrumbLink,
          BreadcrumbPage,
          BreadcrumbSeparator,
          BreadcrumbEllipsis } from './components/ui/breadcrumb'

function App() {

  return (
    <div className="relative min-h-screen bg-gray-100">
      <GraphControls />
      <Breadcrumb className="fixed top-4 left-4 z-50 rounded-xl overflow-hidden">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Graph</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Controls</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default App
