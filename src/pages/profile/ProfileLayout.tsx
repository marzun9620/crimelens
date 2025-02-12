import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/lib/store";
import { Outlet, useLocation } from "react-router-dom";

export function ProfileLayout() {
  const { openStatus } = useSidebarStore();
  const pathName = useLocation().pathname.split("/");
  pathName.shift();

  return (
    <SidebarProvider open={openStatus}>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex text-white h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear
         group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div className="flex items-center gap-2 px-4 text-white">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {pathName && (
              <Breadcrumb>
                <BreadcrumbList>
                  {pathName?.map((item, index) => {
                    const currentLink = `/${pathName
                      .slice(0, index + 1)
                      .join("/")}`;
                    const capitalizedItem =
                      item.charAt(0).toUpperCase() + item.slice(1);
                    return (
                      <BreadcrumbItem key={item} className="hidden md:flex">
                        {index === pathName.length - 1 ? (
                          <BreadcrumbPage>{capitalizedItem}</BreadcrumbPage>
                        ) : (
                          <>
                            <BreadcrumbLink href={currentLink}>
                              {capitalizedItem}
                            </BreadcrumbLink>
                            <BreadcrumbSeparator className="hidden md:block" />
                          </>
                        )}
                      </BreadcrumbItem>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
