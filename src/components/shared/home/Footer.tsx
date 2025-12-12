import { Globe } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">GuideNest</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect with local guides for authentic travel experiences worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Travelers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Explore Tours</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Popular Destinations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Guides</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Become a Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guide Resources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guide Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 LocalGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
