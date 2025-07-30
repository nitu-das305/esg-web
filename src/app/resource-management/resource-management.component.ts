import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Resource {
  id: number;
  name: string;
  type: 'human' | 'equipment' | 'budget' | 'technology';
  status: 'available' | 'allocated' | 'maintenance' | 'depleted';
  department: string;
  cost: number;
  utilization: number;
  lastUpdated: string;
  assignedTo?: string;
  location?: string;
  description?: string;
}

@Component({
  selector: 'app-resource-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './resource-management.component.html',
  styleUrls: ['./resource-management.component.css']
})
export class ResourceManagementComponent {
  sidebarCollapsed = false;
  darkMode = false;
  searchTerm = '';
  selectedType = '';
  selectedDepartment = '';
  selectedStatus = '';
  currentPage = 1;
  pageSize = 10;
  
  resources: Resource[] = [
    {
      id: 1,
      name: 'Marketing Team - Senior Copywriter',
      type: 'human',
      status: 'allocated',
      department: 'Marketing',
      cost: 85000,
      utilization: 85,
      lastUpdated: '2024-01-15',
      assignedTo: 'Sarah Johnson',
      description: 'Experienced copywriter for ESG campaigns'
    },
    {
      id: 2,
      name: 'Adobe Creative Suite License',
      type: 'technology',
      status: 'available',
      department: 'Marketing',
      cost: 2400,
      utilization: 60,
      lastUpdated: '2024-01-14',
      description: 'Design software for content creation'
    },
    {
      id: 3,
      name: 'ESG Campaign Budget Q1',
      type: 'budget',
      status: 'allocated',
      department: 'Marketing',
      cost: 50000,
      utilization: 75,
      lastUpdated: '2024-01-13',
      description: 'Quarterly budget for ESG initiatives'
    },
    {
      id: 4,
      name: 'Video Production Equipment',
      type: 'equipment',
      status: 'maintenance',
      department: 'Marketing',
      cost: 15000,
      utilization: 45,
      lastUpdated: '2024-01-12',
      description: 'Camera and lighting equipment'
    },
    {
      id: 5,
      name: 'Social Media Manager',
      type: 'human',
      status: 'available',
      department: 'Marketing',
      cost: 65000,
      utilization: 30,
      lastUpdated: '2024-01-11',
      description: 'Social media specialist for ESG content'
    },
    {
      id: 6,
      name: 'LinkedIn Premium Account',
      type: 'technology',
      status: 'allocated',
      department: 'Marketing',
      cost: 1200,
      utilization: 90,
      lastUpdated: '2024-01-10',
      description: 'Professional networking platform access'
    },
    {
      id: 7,
      name: 'ESG Analytics Software',
      type: 'technology',
      status: 'available',
      department: 'Marketing',
      cost: 8000,
      utilization: 25,
      lastUpdated: '2024-01-09',
      description: 'Data analysis tools for ESG metrics'
    },
    {
      id: 8,
      name: 'Content Creation Budget',
      type: 'budget',
      status: 'depleted',
      department: 'Marketing',
      cost: 25000,
      utilization: 100,
      lastUpdated: '2024-01-08',
      description: 'Budget for content creation activities'
    }
  ];
  
  filteredResources: Resource[] = [...this.resources];
  paginatedResources: Resource[] = [];
  
  get totalResources(): number {
    return this.resources.length;
  }
  
  get availableResources(): number {
    return this.resources.filter(r => r.status === 'available').length;
  }
  
  get utilizationRate(): number {
    const totalUtilization = this.resources.reduce((sum, r) => sum + r.utilization, 0);
    return Math.round(totalUtilization / this.resources.length);
  }
  
  get totalCost(): number {
    return this.resources.reduce((sum, r) => sum + r.cost, 0);
  }
  
  get totalPages(): number {
    return Math.ceil(this.filteredResources.length / this.pageSize);
  }
  
  get Math() {
    return Math;
  }
  
  constructor(private router: Router) {
    this.updatePaginatedResources();
  }
  
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }
  
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  
  filterByType(type: string) {
    this.selectedType = type;
    this.filterResources();
  }
  
  filterResources() {
    this.filteredResources = this.resources.filter(resource => {
      const matchesSearch = !this.searchTerm || 
        resource.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (resource.description && resource.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesType = !this.selectedType || resource.type === this.selectedType;
      const matchesDepartment = !this.selectedDepartment || resource.department === this.selectedDepartment;
      const matchesStatus = !this.selectedStatus || resource.status === this.selectedStatus;
      
      return matchesSearch && matchesType && matchesDepartment && matchesStatus;
    });
    
    this.currentPage = 1;
    this.updatePaginatedResources();
  }
  
  updatePaginatedResources() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedResources = this.filteredResources.slice(startIndex, endIndex);
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedResources();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedResources();
    }
  }
  
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedResources();
  }
  
  addResource() {
    alert('Add Resource functionality will be implemented here!');
  }
  
  importResources() {
    alert('Import Resources functionality will be implemented here!');
  }
  
  exportResources() {
    alert('Export Resources functionality will be implemented here!');
  }
  
  viewResource(resource: Resource) {
    alert(`Viewing resource: ${resource.name}`);
  }
  
  editResource(resource: Resource) {
    alert(`Editing resource: ${resource.name}`);
  }
  
  allocateResource(resource: Resource) {
    alert(`Allocating resource: ${resource.name}`);
  }
  
  deleteResource(resource: Resource) {
    alert(`Deleting resource: ${resource.name}`);
  }
} 